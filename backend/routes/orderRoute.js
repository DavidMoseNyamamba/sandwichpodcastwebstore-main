import express from 'express'
import { placeOrder, placeOrderFlutterwave, placeOrderMpesa, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features  
orderRouter.post('/placeOrder', authUser, placeOrder)
orderRouter.post('/flutterwave', authUser, placeOrderFlutterwave)
orderRouter.post('/mpesa', authUser, placeOrderMpesa)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
