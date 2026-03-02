import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ButtonLoading } from "../components/Loading";
import Title from "../components/Title";

const MpesaVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token, setCartItems } = useContext(ShopContext);
  
  const [mpesaCode, setMpesaCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get order data from navigation state
  const { orderData } = location.state || {};

  // Redirect if no order data
  if (!orderData) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mpesaCode.trim()) {
      toast.error("Please enter M-Pesa transaction code");
      return;
    }

    setIsProcessing(true);

    try {
      // Add M-Pesa code to order data
      const updatedOrderData = {
        ...orderData,
        mpesaCode: mpesaCode.trim(),
        paymentMethod: "cod"
      };

      const response = await axios.post(
        backendUrl + "/api/order/placeOrder",
        updatedOrderData,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md border border-gray-300 rounded-lg p-8 shadow-md">
        <div className="text-center mb-6">
          <Title text1={"MPESA"} text2={"VERIFICATION"} />
        </div>

        <div className="mb-6 bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Payment Instructions:</strong>
          </p>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Go to M-Pesa on your phone</li>
            <li>Select Lipa Na M-Pesa</li>
            <li>Select Buy Goods and Services</li>
            <li>Enter Till Number: <strong>6958770</strong></li>
            <li>Enter Amount: <strong>KES {orderData?.amount}</strong></li>
            <li>Enter your M-Pesa PIN</li>
            <li>Copy the transaction code from the confirmation SMS</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              M-Pesa Transaction Code
            </label>
            <input
              type="text"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
              placeholder="e.g., QG12ABC3XY"
              className="w-full border border-gray-300 rounded py-2.5 px-3.5 uppercase"
              required
              maxLength={10}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the M-Pesa confirmation code you received via SMS
            </p>
          </div>

          <ButtonLoading
            type="submit"
            isLoading={isProcessing}
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-3 text-sm font-medium hover:bg-green-700 transition-colors rounded"
          >
            VERIFY & PLACE ORDER
          </ButtonLoading>

          <button
            type="button"
            onClick={() => navigate("/place-order")}
            className="w-full border border-gray-300 text-gray-700 py-3 text-sm font-medium hover:bg-gray-50 transition-colors rounded"
            disabled={isProcessing}
          >
            BACK TO CHECKOUT
          </button>
        </form>
      </div>
    </div>
  );
};

export default MpesaVerification;