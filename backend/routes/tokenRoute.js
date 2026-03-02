import express from 'express'
import { createToken, stkPush, queryPayment } from '../controllers/tokenController.js'
import axios from 'axios'

const tokenRouter = express.Router()

const getBaseURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
};

const generateAccessToken = async () => {
    const consumer = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_SECRET_KEY;
    
    const url = `${getBaseURL()}/oauth/v1/generate?grant_type=client_credentials`; // Fixed: Use getBaseURL()

    const response = await axios.get(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`${consumer}:${secret}`).toString("base64")}`
        }
    });

    return response.data.access_token;
};

// Existing routes
tokenRouter.get("/", (req, res) => {
    res.send("M-Pesa token route is working");
});

tokenRouter.get("/generate", async (req, res) => {
    try {
        const token = await generateAccessToken();
        res.json({ access_token: token });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

tokenRouter.post("/stkpush", createToken, stkPush);

// Debug route to check environment variables
tokenRouter.get('/debug', (req, res) => {
    res.json({
        hasConsumerKey: !!process.env.MPESA_CONSUMER_KEY,
        hasSecretKey: !!process.env.MPESA_SECRET_KEY,
        hasShortcode: !!process.env.MPESA_SHORTCODE,
        hasPasskey: !!process.env.MPESA_PASSKEY,
        shortcode: process.env.MPESA_SHORTCODE,
        passkeyLength: process.env.MPESA_PASSKEY?.length || 0,
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        apiUrl: getBaseURL() // Added: Show which API URL is being used
    });
});

// Payment query route with better error handling
tokenRouter.post('/query', async (req, res) => {
    try {
        const { checkoutRequestID } = req.body;
        
        console.log('=== PAYMENT QUERY DEBUG ===');
        console.log('CheckoutRequestID:', checkoutRequestID);
        console.log('Using sandbox passkey length:', process.env.MPESA_PASSKEY?.length);
        
        if (!checkoutRequestID) {
            return res.status(400).json({ 
                success: false,
                error: 'CheckoutRequestID is required' 
            });
        }

        // Check if required env variables exist
        if (!process.env.MPESA_CONSUMER_KEY || !process.env.MPESA_SECRET_KEY) {
            throw new Error('Missing M-Pesa credentials in environment variables');
        }
        
        console.log('Step 1: Generating access token...');
        
        // Generate token
        const token = await generateAccessToken();
        console.log('Step 2: Access token generated successfully');
        
        // Create timestamp in correct format
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const timestamp = 
            now.getFullYear().toString() +
            pad(now.getMonth() + 1) +
            pad(now.getDate()) +
            pad(now.getHours()) +
            pad(now.getMinutes()) +
            pad(now.getSeconds());
        
        // Create password using sandbox passkey
        const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
        
        const queryData = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            CheckoutRequestID: checkoutRequestID
        };
        
        console.log('Step 3: Query data prepared for sandbox');
        
        // Query payment status from SANDBOX API
        const response = await axios.post(
            `${getBaseURL()}/mpesa/stkpushquery/v1/query`,
            queryData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Token response:', response.data);
        res.json({ 
            success: true, 
            message: 'Token generated successfully',
            data: response.data,
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
            apiUrl: getBaseURL()
        });
        
    } catch (error) {
        console.error('Token generation error details:');
        console.error('Status:', error.response?.status);
        console.error('Status Text:', error.response?.statusText);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        
        res.status(500).json({ 
            success: false, 
            message: 'Token generation failed',
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
            apiUrl: getBaseURL(),
            error: {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message
            }
        });
    }
});

export default tokenRouter;