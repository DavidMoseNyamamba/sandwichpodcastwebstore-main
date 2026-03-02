import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Mpesa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fix: Add missing context variables
  const { 
    backendUrl, 
    token, 
    setCartItems,
  } = useContext(ShopContext);
  
  // Get order data passed from PlaceOrder
  const { orderData, formData } = location.state || {};
  
  const [phone, setPhone] = useState(formData?.phone || "");
  const [amount, setAmount] = useState(orderData?.amount || "");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); // 'pending', 'success', 'failed'
  const [checkoutRequestID, setCheckoutRequestID] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes timeout

  // Countdown timer for payment timeout
  useEffect(() => {
    if (paymentStatus === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setPaymentStatus('failed');
      toast.error("Payment timeout. Please try again.");
    }
  }, [paymentStatus, countdown]);

  // Poll payment status every 3 seconds
  useEffect(() => {
    if (paymentStatus === 'pending' && checkoutRequestID) {
      let pollAttempts = 0;
      const maxAttempts = 15;
      let isMounted = true; // Add cleanup flag
      
      const pollInterval = setInterval(async () => {
        if (!isMounted) return; // Check if component is still mounted
        
        try {
          pollAttempts++;
          
          const statusResponse = await axios.post(backendUrl + "/token/query", {
            checkoutRequestID
          });

          if (!isMounted) return; // Check again after async operation

          if (statusResponse.data.success && statusResponse.data.data) {
            const resultCode = statusResponse.data.data.ResultCode;
            
            if (resultCode === "0" || resultCode === 0) {
              setPaymentStatus('success');
              clearInterval(pollInterval);
              toast.success("Payment confirmed!");
              await placeOrderAfterPayment();
            } else if (resultCode === "1037" || resultCode === 1037) {
              setPaymentStatus('failed');
              clearInterval(pollInterval);
              
              // Fix: Use Vite's import.meta.env instead of process.env
              const isProduction = import.meta.env.MODE === 'production';
              const message = isProduction 
                ? "Payment timeout. Please try again or contact support if money was deducted."
                : "Payment timeout in sandbox - this is normal. Try with a different test number.";
              
              toast.error(message);
            } else if (resultCode === "1032" || resultCode === 1032) {
              setPaymentStatus('failed');
              clearInterval(pollInterval);
              toast.error("Payment cancelled by user.");
            } else {
              setPaymentStatus('failed');
              clearInterval(pollInterval);
              toast.error(`Payment failed (Code: ${resultCode}). Please try again.`);
            }
          }
        } catch (error) {
          if (!isMounted) return;
          
          console.error("Status check error:", error);
          
          if (pollAttempts >= maxAttempts) {
            clearInterval(pollInterval);
            
            // Fix: Use Vite's import.meta.env
            const isProduction = import.meta.env.MODE === 'production';
            
            if (isProduction) {
              setPaymentStatus('failed');
              toast.error("Unable to verify payment. Please contact support if money was deducted.");
            } else {
              const userConfirmed = window.confirm(
                `Unable to automatically verify your M-Pesa payment.
                
Did you receive an M-Pesa confirmation message on your phone for KES ${amount}?`
              );
              
              if (userConfirmed && isMounted) {
                setPaymentStatus('success');
                toast.success("Payment confirmed manually!");
                await placeOrderAfterPayment();
              } else if (isMounted) {
                setPaymentStatus('failed');
                toast.error("Payment cancelled.");
              }
            }
          }
        }
      }, 3000);

      // Cleanup function
      return () => {
        isMounted = false;
        clearInterval(pollInterval);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentStatus, checkoutRequestID, amount, backendUrl]); // Keep dependencies minimal to avoid infinite loops

  const payHandler = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setCountdown(120);
    
    try {
      // Ensure phone number is in correct format for sandbox
      let formattedPhone = phone;
      if (phone.startsWith('0')) {
        formattedPhone = '254' + phone.substring(1);
      } else if (!phone.startsWith('254')) {
        formattedPhone = '254' + phone;
      }
      
      console.log('Sending payment request with phone:', formattedPhone);
      
      const stkResponse = await axios.post(backendUrl + "/token/stkpush", {
        amount: amount.toString(),
        phoneNumber: formattedPhone
      });

      console.log("STK Response:", stkResponse.data);

      const checkoutRequestID = stkResponse.data?.data?.CheckoutRequestID;
      
      if (checkoutRequestID) {
        setCheckoutRequestID(checkoutRequestID);
        toast.success("STK Push sent! Please complete payment on your phone");
        setPaymentStatus('pending');
      } else {
        throw new Error("No CheckoutRequestID received");
      }

    } catch (error) {
      console.error("Payment Error:", error);
      setPaymentStatus('failed');
      
      if (error.response?.data?.error) {
        toast.error(`M-Pesa Error: ${error.response.data.error}`);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const placeOrderAfterPayment = async () => {
    try {
      // Use the correct M-Pesa endpoint - userId is automatically added by auth middleware
      const response = await axios.post(backendUrl + '/api/order/mpesa', orderData, {
        headers: { token }
      });

      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        throw new Error(response.data.message || "Order placement failed");
      }
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order. Please contact support.');
    }
  };

  const retryPayment = () => {
    setPaymentStatus('');
    setCheckoutRequestID('');
    setCountdown(120);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl text-center mb-6">
          <span className="text-green-600 font-bold">M-Pesa</span> Payment
        </h1>
        
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p><strong>Amount:</strong> Ksh {amount}</p>
          <p><strong>Order Total:</strong> Ksh {orderData?.amount}</p>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'pending' && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-3"></div>
              <p className="text-yellow-800 font-medium">
                ⏳ Waiting for payment confirmation...
              </p>
              <p className="text-sm text-yellow-700 mt-2">
                Please complete the payment on your phone
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Time remaining: {formatTime(countdown)}
              </p>
            </div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-green-800 font-medium">Payment confirmed!</p>
              <p className="text-sm text-green-700">Processing your order...</p>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
            <div className="text-center">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-800 font-medium">Payment failed</p>
              <p className="text-sm text-red-700 mb-3">Please try again</p>
              <button
                onClick={retryPayment}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <form onSubmit={payHandler} className="flex flex-col space-y-5">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 bg-slate-100 text-center rounded-xl"
            required
            readOnly
          />
          <input
            type="tel"
            placeholder="Enter phone number (e.g., 0712345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 bg-slate-100 text-center rounded-xl"
            required
            disabled={isProcessing || paymentStatus === 'pending'}
          />
          <button
            type="submit"
            disabled={isProcessing || paymentStatus === 'pending' || paymentStatus === 'success'}
            className={`p-3 rounded-xl font-medium ${
              isProcessing || paymentStatus === 'pending' || paymentStatus === 'success'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {isProcessing ? 'Sending STK Push...' : 
             paymentStatus === 'pending' ? 'Waiting for Payment...' :
             paymentStatus === 'success' ? 'Payment Confirmed' :
             'Pay with M-Pesa'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/place-order')}
            className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl font-medium"
            disabled={paymentStatus === 'pending' || paymentStatus === 'success'}
          >
            Back to Payment Methods
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mpesa;
