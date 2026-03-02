# 🖥️ Sandwich Podcast Web Store - Backend API

A robust, scalable backend API for the ecommerce platform built with Node.js, Express, and MongoDB. Features M-Pesa integration, JWT authentication, email services, and comprehensive order management.

## 🚀 Features

### 💳 **Payment Processing**

- **M-Pesa Daraja API** - Complete STK Push integration for Kenyan mobile payments
- **Flutterwave Integration** - International card payment processing
- **Payment Webhooks** - Real-time payment status updates and confirmations
- **Order Management** - Comprehensive order tracking and status management

### 🔐 **Authentication & Security**

- **JWT Authentication** - Secure token-based user authentication
- **Password Hashing** - bcrypt encryption for user passwords
- **Admin Authentication** - Separate admin login system
- **Email Verification** - Account verification with resend functionality
- **Middleware Protection** - Route-based authentication and authorization

### 📧 **Email Services**

- **Nodemailer Integration** - SMTP email sending capabilities
- **Verification Emails** - Automated account verification emails
- **Order Notifications** - Email confirmations and updates
- **Password Reset** - Secure password recovery system

### 🛍️ **E-commerce Features**

- **Product Management** - CRUD operations for products with image uploads
- **Shopping Cart** - Persistent cart management with user sessions
- **Order Processing** - Complete order lifecycle management
- **Inventory Tracking** - Product availability and stock management
- **Category Management** - Product categorization and filtering

### ☁️ **Cloud Services**

- **Cloudinary Integration** - Image upload and optimization
- **MongoDB Atlas** - Cloud database with automatic scaling
- **File Upload** - Multer middleware for handling multipart forms

## 🛠️ Tech Stack

### **Runtime & Framework**

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **ES Modules** - Modern JavaScript module system

### **Database**

- **MongoDB** - NoSQL document database
- **Mongoose** - Object Data Modeling (ODM) library

### **Authentication & Security**

- **JSON Web Tokens (JWT)** - Secure token-based authentication
- **bcrypt** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing configuration

### **Payment Integration**

- **M-Pesa Daraja API** - Mobile money payment processing
- **Flutterwave Node.js SDK** - Card payment gateway integration

### **File & Email Services**

- **Cloudinary** - Image and video management
- **Nodemailer** - Email sending service
- **Multer** - File upload middleware

### **Development Tools**

- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management
- **Validator** - Data validation library

## 📁 Project Structure

```plaintext
backend/
├── config/
│   ├── mongodb.js        # Database connection
│   ├── cloudinary.js     # Image upload config
│   └── email.js          # Email service config
├── controllers/
│   ├── userController.js     # User management & auth
│   ├── productController.js  # Product CRUD operations
│   ├── orderController.js    # Order processing
│   ├── cartController.js     # Shopping cart logic
│   └── tokenController.js    # M-Pesa token & STK Push
├── middleware/
│   ├── auth.js          # User authentication middleware
│   ├── adminAuth.js     # Admin authentication middleware
│   └── multer.js        # File upload configuration
├── models/
│   ├── userModel.js     # User schema definition
│   ├── productModel.js  # Product schema definition
│   └── orderModel.js    # Order schema definition
├── routes/
│   ├── userRoute.js     # User authentication routes
│   ├── productRoute.js  # Product management routes
│   ├── orderRoute.js    # Order processing routes
│   ├── cartRoute.js     # Shopping cart routes
│   └── tokenRoute.js    # M-Pesa payment routes
├── migrations/
│   └── updateProducts.js    # Database migration scripts
├── uploads/             # Local file storage (development)
├── server.js           # Main application entry point
├── package.json        # Dependencies and scripts
└── README.md          # This documentation
```

## 🏃‍♂️ Getting Started

### **Prerequisites**

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for image uploads
- M-Pesa Daraja API credentials (Safaricom developer account)
- Flutterwave account for card payments
- SMTP email service (Gmail, SendGrid, etc.)

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd sandwichpodcastwebstore/backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the backend root:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary Configuration
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET_KEY=your-secret-key

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# M-Pesa Configuration (Sandbox)
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/token/callback

# Flutterwave Configuration
FLUTTERWAVE_SECRET_KEY=your-flutterwave-secret-key
FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-public-key

# Admin Credentials
ADMIN_EMAIL=admin@sandwichpodcast.com
ADMIN_PASSWORD=secure-admin-password
```

4. **Start the server**

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will be available at `http://localhost:4000`

## 🔧 API Endpoints

### **Authentication**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/user/register` | User registration | ❌ |
| POST | `/api/user/login` | User login | ❌ |
| POST | `/api/user/adminlogin` | Admin login | ❌ |
| POST | `/api/user/verify-email` | Email verification | ❌ |
| POST | `/api/user/resend-verification` | Resend verification email | ❌ |
| GET | `/api/user/profile` | Get user profile | ✅ |

### **Products**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/product/list` | Get all products | ❌ |
| POST | `/api/product/add` | Add new product | 👨‍💼 Admin |
| POST | `/api/product/remove` | Delete product | 👨‍💼 Admin |
| GET | `/api/product/single` | Get single product | ❌ |

### **Orders**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/order/list` | Get all orders (admin) | 👨‍💼 Admin |
| POST | `/api/order/status` | Update order status | 👨‍💼 Admin |
| POST | `/api/order/place` | Place new order | ✅ |
| POST | `/api/order/userOrders` | Get user orders | ✅ |

### **Cart**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/cart/get` | Get user cart | ✅ |
| POST | `/api/cart/add` | Add item to cart | ✅ |
| POST | `/api/cart/update` | Update cart item | ✅ |

### **M-Pesa Payments**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/token/stk-push` | Initiate STK Push | ✅ |
| POST | `/api/token/query` | Query payment status | ✅ |
| POST | `/api/token/callback` | Payment callback (Webhook) | ❌ |

## 💳 Payment Integration

### **M-Pesa STK Push Flow**

1. **User initiates payment** - Frontend sends payment request
2. **Generate access token** - Server authenticates with M-Pesa API
3. **STK Push request** - Send payment prompt to user's phone
4. **User authorizes** - Customer enters M-Pesa PIN
5. **Callback received** - M-Pesa sends payment confirmation
6. **Order updated** - Payment status updated in database

### **Flutterwave Integration**

1. **Payment initialization** - Frontend collects card details
2. **Server validation** - Backend validates payment data
3. **Flutterwave processing** - Payment processed through Flutterwave
4. **Webhook confirmation** - Payment status confirmed via webhook
5. **Order completion** - Order marked as paid and processed

## 📧 Email Configuration

### **Supported Email Providers**

- Gmail (recommended for development)
- SendGrid (recommended for production)
- Mailgun
- AWS SES
- Custom SMTP servers

### **Email Templates**

- **Welcome Email** - Sent after successful registration
- **Verification Email** - Account verification with secure token
- **Order Confirmation** - Sent after successful order placement
- **Payment Confirmation** - Sent after successful payment
- **Password Reset** - Secure password recovery emails

## 🔒 Security Features

### **Authentication Security**

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure, stateless authentication
- **Token Expiration** - Automatic token expiry for security
- **Admin Separation** - Separate admin authentication system

### **Data Validation**

- **Input Sanitization** - Prevent injection attacks
- **Email Validation** - Validator library for email verification
- **Password Strength** - Minimum password requirements
- **File Upload Validation** - Secure file type checking

### **Environment Security**

- **Environment Variables** - Sensitive data in .env files
- **CORS Configuration** - Proper cross-origin setup
- **Error Handling** - Secure error messages without data leaks

## 🚀 Deployment

### **Environment Setup**

1. **Production Database** - MongoDB Atlas production cluster
2. **Environment Variables** - Production-specific configurations
3. **Email Service** - Production-grade email provider
4. **Payment Credentials** - Live payment gateway credentials

### **Deployment Platforms**

#### **Render (Recommended)**

```bash
# Build Command
npm install

# Start Command
npm start
```

#### **Heroku**

```bash
heroku create your-app-name
git push heroku main
```

#### **Digital Ocean**

```bash
# Droplet with Node.js environment
pm2 start server.js --name "ecommerce-api"
```

### **Production Checklist**

- [ ] Environment variables configured
- [ ] MongoDB Atlas production database
- [ ] Cloudinary production account
- [ ] M-Pesa live credentials (after testing)
- [ ] Flutterwave live keys
- [ ] Production email service
- [ ] SSL/HTTPS certificate
- [ ] Domain name and DNS setup
- [ ] Error logging service (optional)
- [ ] Database backups configured

## 📊 Database Schema

### **User Model**

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object,
  isVerified: Boolean,
  verificationToken: String,
  createdAt: Date
}
```

### **Product Model**

```javascript
{
  name: String,
  description: String,
  price: Number,
  image: [String],
  category: String,
  subCategory: String,
  sizes: [String],
  bestseller: Boolean,
  trending: Boolean,
  date: Date
}
```

### **Order Model**

```javascript
{
  userId: ObjectId,
  items: [Object],
  amount: Number,
  address: Object,
  status: String,
  paymentMethod: String,
  payment: Boolean,
  date: Date
}
```

## 🐛 Error Handling

### **Common Error Codes**

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (authentication required)
- **403** - Forbidden (admin access required)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error (system errors)

### **Error Response Format**

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info (development only)"
}
```

## 🧪 Testing

### **API Testing Tools**

- **Postman** - API testing and documentation
- **Thunder Client** - VS Code extension for API testing
- **cURL** - Command line API testing

### **Test Environment Setup**

1. Create test database
2. Use M-Pesa sandbox credentials
3. Use Flutterwave test keys
4. Configure test email service

## 📈 Performance & Monitoring

### **Performance Optimizations**

- **Database Indexing** - Optimized MongoDB queries
- **Image Optimization** - Cloudinary automatic optimization
- **Caching** - Response caching for static data
- **Compression** - Gzip compression for responses

### **Monitoring (Recommended)**

- **PM2** - Process management in production
- **MongoDB Compass** - Database monitoring
- **Cloudinary Analytics** - Image delivery metrics
- **Payment Gateway Dashboards** - Transaction monitoring

## 📞 Support & Contact

### **Development Support**

- **Email**: <biasharasoftwares@gmail.com>
- **Phone**: +254114713966
- **Location**: Langata, Nairobi, Kenya

### **API Documentation**

- **Postman Collection**: Available on request
- **Swagger Documentation**: Coming soon
- **Test Endpoints**: Sandbox environment available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Built with ❤️ by Biashara Softwares

*Powering modern e-commerce with secure payments and seamless user experiences.*