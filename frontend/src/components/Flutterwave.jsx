import { useState, useContext } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Flutterwave = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token, setCartItems } = useContext(ShopContext);
  
  // Get order data passed from PlaceOrder
  const { orderData, formData } = location.state || {};
  
  const [email, setEmail] = useState(formData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(formData?.phone || "");
  const [name, setName] = useState(`${formData?.firstName || ""} ${formData?.lastName || ""}`.trim());
  const [isProcessing, setIsProcessing] = useState(false);

  // Flutterwave configuration - CARD PAYMENTS ONLY
  const config = {
    public_key: 'FLWPUBK_TEST-ab0020daacbb1a112484295515ab2f92-X', // Your test key - update for production
    tx_ref: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount: orderData?.amount || 100,
    currency: 'KES', // Kenyan Shillings
    payment_options: 'card', // CARD PAYMENTS ONLY
    country: 'KE', // Kenya country code
    customer: {
      email: email,
      phone_number: phoneNumber.startsWith('254') ? phoneNumber : `254${phoneNumber.replace(/^0/, '')}`,
      name: name,
    },
    customizations: {
      title: 'Sandwich Podcast Store - Card Payment',
      description: 'Secure card payment processing',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
    meta: {
      order_id: `order_${Date.now()}`,
      source: 'sandwich_podcast_web',
      payment_type: 'card_only'
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  const paymentHandler = () => {
    if (!email || !phoneNumber || !name) {
      toast.error("Please fill in all payment details");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsProcessing(true);
    
    handleFlutterPayment({
      callback: async (response) => {
        console.log("Flutterwave Payment Response:", response);
        
        if (response.status === 'successful') {
          const paymentMethod = response.payment_type || 'flutterwave';
          const isMPesa = paymentMethod.toLowerCase().includes('mobilemoney') || 
                          paymentMethod.toLowerCase().includes('mpesa');
          
          toast.success(`${isMPesa ? 'M-Pesa' : 'Card'} payment successful! Processing your order...`);
          
          try {
            // Debug: Log order data before sending
            console.log("Order data to send:", orderData);
            console.log("Payment response:", response);
            
            // Place the order after successful payment using the correct endpoint
            const orderPayload = {
              ...orderData,
              paymentMethod: isMPesa ? 'M-Pesa via Flutterwave' : 'Card via Flutterwave',
              paymentProvider: 'flutterwave',
              transactionId: response.transaction_id,
              flutterwaveRef: response.tx_ref,
              paymentType: paymentMethod,
              paymentDetails: {
                amount: response.amount,
                currency: response.currency,
                processor_response: response.processor_response,
                ...(isMPesa ? {
                  phone_number: response.customer?.phone_number
                } : {
                  last4: response.card?.last_4digits || 'N/A',
                  brand: response.card?.type || 'N/A'
                })
              }
            };
            
            console.log("Final order payload:", orderPayload);
            console.log("Token:", token);
            console.log("Backend URL:", backendUrl);
            
            const orderResponse = await axios.post(backendUrl + '/api/order/flutterwave', orderPayload, {
              headers: { token }
            });

            console.log("Order response:", orderResponse.data);
            
            if (orderResponse.data.success) {
              setCartItems({});
              toast.success("Order placed successfully!");
              setTimeout(() => navigate('/orders'), 2000);
            } else {
              console.error("Order placement failed:", orderResponse.data);
              toast.error(orderResponse.data.message || "Failed to place order");
            }
          } catch (error) {
            console.error("Order Error Details:", error);
            console.error("Error response:", error.response?.data);
            console.error("Error status:", error.response?.status);
            
            if (error.response?.status === 401) {
              toast.error("Authentication failed. Please log in again.");
            } else if (error.response?.status === 400) {
              toast.error(`Bad request: ${error.response.data.message || 'Invalid data sent'}`);
            } else {
              toast.error("Payment successful but failed to place order. Please contact support.");
            }
          }
        } else {
          toast.error("Payment failed. Please try again.");
          console.log("Payment failed:", response);
        }
        
        setIsProcessing(false);
        closePaymentModal(); // Close modal
      },
      onClose: () => {
        console.log("Payment modal closed");
        setIsProcessing(false);
        toast.info("Payment cancelled");
      },
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">💳</div>
          <h1 className="text-3xl">
            <span className="text-blue-600 font-bold">Card</span> Payment
          </h1>
          <p className="text-gray-600 text-sm mt-2">Secure card payment with Flutterwave</p>
        </div>
        
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800"><strong>Amount:</strong> KES {orderData?.amount}</p>
          <p className="text-green-700 text-sm mt-1">Secure card payment processing</p>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number (e.g., 0712345678)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            onClick={paymentHandler}
            disabled={isProcessing}
            className={`w-full p-4 rounded-xl font-medium text-white ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            } transition-all duration-200 transform ${
              !isProcessing ? 'hover:scale-[1.02] active:scale-[0.98]' : ''
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Payment...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Pay with Card
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/place-order')}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-xl font-medium transition-colors"
            disabled={isProcessing}
          >
            Back to Payment Methods
          </button>
        </div>

        {/* Payment Security Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Secure Card Payment
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2zM13 10V9a2 2 0 10-4 0v1m-1 0h6a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2z" />
              </svg>
              <span className="text-sm text-blue-700">256-bit SSL encryption</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-blue-700">PCI DSS compliant</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm text-blue-700">Visa, Mastercard supported</span>
            </div>
          </div>
        </div>

        {/* Test Card Info for Development */}
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-800">
            <strong>Test Mode:</strong> Use test card numbers for development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flutterwave;