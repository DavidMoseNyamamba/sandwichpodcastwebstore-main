import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


//placing orders using COD method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing orders using Flutterwave method

const placeOrderFlutterwave = async (req, res) => {
  try {
    console.log("Flutterwave Order Request Body:", req.body);
    
    const { 
      userId, 
      items, 
      amount, 
      address, 
      paymentMethod = "Flutterwave",
      transactionId,
      flutterwaveRef,
      paymentType,
      paymentDetails
    } = req.body;

    // Validate required fields
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "Order items are required" });
    }
    if (!amount || amount <= 0) {
      return res.json({ success: false, message: "Valid amount is required" });
    }
    if (!address) {
      return res.json({ success: false, message: "Delivery address is required" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: true, // Flutterwave payments are already processed
      date: Date.now(),
    };

    // Add Flutterwave-specific data if available
    if (transactionId) {
      orderData.transactionId = transactionId;
    }
    if (flutterwaveRef) {
      orderData.flutterwaveRef = flutterwaveRef;
    }
    if (paymentType) {
      orderData.paymentType = paymentType;
    }
    if (paymentDetails) {
      orderData.paymentDetails = paymentDetails;
    }

    console.log("Creating order with data:", orderData);

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    console.log("Order saved successfully:", newOrder._id);

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    console.log("Cart cleared for user:", userId);

    res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Flutterwave Order Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//placing orders using Mpesa method

const placeOrderMpesa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Mpesa",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for admin panel

const allOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// User order data for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

// Update order status from Admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(
      orderId,
      { status }
    );
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderFlutterwave,
  placeOrderMpesa,
  allOrders,
  userOrders,
  updateStatus,
};
