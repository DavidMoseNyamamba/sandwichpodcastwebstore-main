import axios from "axios";

const getBaseURL = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
};

const createToken = async (req, res, next) => {
  const consumer = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_SECRET_KEY;
  
  const url = `${getBaseURL()}/oauth/v1/generate?grant_type=client_credentials`;

  await axios.get(
      url,
      {
          headers: {
              Authorization: `Basic ${Buffer.from(`${consumer}:${secret}`).toString("base64")}` // Fixed: Use consumer and secret
          },
      }
  ).then((data)=>{
      req.token = data.data.access_token;
      console.log(data.data);
      next();
  }).catch((err)=>{
      console.error(err);
      res.status(500).json({ error: "Failed to generate token" });
  });
}

const stkPush = async (req, res) => {
  const token = req.token;
  const amount = req.body.amount;
  const phoneNumber = req.body.phoneNumber;

  // Validate required fields
  if (!phoneNumber) {
      return res.status(400).json({ error: "phoneNumber is required" });
  }
  
  if (!amount) {
      return res.status(400).json({ error: "amount is required" });
  }

  // Remove the first character if it's '0' and add country code
  const formattedPhone = phoneNumber.startsWith('0') ? '254' + phoneNumber.substring(1) : phoneNumber;

  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const timestamp = 
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  const url = `${getBaseURL()}/mpesa/stkpush/v1/processrequest`;

  await axios.post(
      url,
      {
          "BusinessShortCode": process.env.MPESA_SHORTCODE,
          "Password": Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64"),
          "Timestamp": timestamp,
          "TransactionType": "CustomerPayBillOnline",
          "Amount": amount,
          "PartyA": formattedPhone,
          "PartyB": process.env.MPESA_SHORTCODE,
          "PhoneNumber": formattedPhone,
          "CallBackURL": process.env.MPESA_SANDBOX_URL,
          "AccountReference": "The Sandwich Podcast",
          "TransactionDesc": "Payment for Sandwich Podcast"
      },
      {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
  ).then((data) => {
      console.log(data.data);
      res.status(200).json({ message: "STK Push successful", data: data.data });
  }).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to initiate STK Push" });
  });
}

const queryPayment = async (req, res) => {
  try {
      const { checkoutRequestID } = req.body;
      
      console.log('Querying payment for CheckoutRequestID:', checkoutRequestID);
      
      if (!checkoutRequestID) {
          return res.status(400).json({
              success: false,
              message: 'CheckoutRequestID is required'
          });
      }

      // Get access token
      const consumer = process.env.MPESA_CONSUMER_KEY;
      const secret = process.env.MPESA_SECRET_KEY;

      const tokenResponse = await axios.get(
          `${getBaseURL()}/oauth/v1/generate?grant_type=client_credentials`, // Fixed: Use getBaseURL() instead of hardcoded URL
          {
              headers: {
                  Authorization: `Basic ${Buffer.from(`${consumer}:${secret}`).toString("base64")}`
              },
          }
      );

      const accessToken = tokenResponse.data.access_token;
      
      // Generate timestamp and password for query
      const now = new Date();
      const pad = n => n.toString().padStart(2, '0');
      const timestamp = 
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());

      const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");
      
      const queryData = {
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestID
      };

      console.log('Query data:', queryData);

      const url = `${getBaseURL()}/mpesa/stkpushquery/v1/query`;

      const response = await axios.post(
          url,
          queryData,
          {
              headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      console.log('Safaricom query response:', response.data);

      res.status(200).json({
          success: true,
          message: 'Payment status retrieved successfully',
          data: response.data
      });

  } catch (error) {
      console.error('Payment query error:', error.response?.data || error.message);
      
      res.status(500).json({
          success: false,
          message: 'Payment query failed',
          error: error.response?.data || error.message
      });
  }
};

export { createToken, stkPush, queryPayment };