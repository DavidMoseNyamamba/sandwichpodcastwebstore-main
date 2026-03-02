# 🛍️ Sandwich Podcast Web Store - Frontend

A modern, responsive ecommerce frontend application built with React and Vite, featuring M-Pesa integration, dual payment systems, and a comprehensive user experience.

## 🚀 Features

### 💳 **Payment Integration**

- **M-Pesa STK Push** - Seamless mobile money payments for Kenyan customers
- **Flutterwave Cards** - International credit/debit card processing
- **Real-time Payment Status** - Live payment confirmation and order tracking

### 🛒 **Shopping Experience**

- **Product Catalog** - Browse and filter products by category, price, and popularity
- **Advanced Search** - Smart product search with real-time filtering
- **Shopping Cart** - Add, remove, and manage items with quantity controls
- **Wishlist Support** - Save favorite products for later

### 👤 **User Management**

- **Authentication** - Secure login/signup with JWT tokens
- **Email Verification** - Account verification with resend functionality
- **User Profile** - Personal dashboard with order history
- **Order Tracking** - Real-time order status updates

### 📱 **User Interface**

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Loading States** - Professional loading indicators throughout the app
- **Toast Notifications** - Real-time feedback for user actions
- **Modern UI** - Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and dev server
- **React Router DOM 7** - Client-side routing

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Comprehensive icon library
- **Custom Components** - Reusable UI components

### **State Management**

- **React Context** - Global state management
- **Local Storage** - Persistent cart and authentication

### **HTTP & API**

- **Axios** - HTTP client for API requests
- **JWT Authentication** - Secure token-based auth

### **Payment Integration**

- **Flutterwave React v3** - Card payment processing
- **M-Pesa Daraja API** - Mobile money integration

### **Notifications**

- **React Toastify** - Toast notifications

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/           # Images, icons, and static files
│   ├── components/       # Reusable UI components
│   │   ├── Loading.jsx   # Loading states system
│   │   ├── Navbar.jsx    # Navigation with conditional search
│   │   ├── SearchBar.jsx # Product search functionality
│   │   └── ...
│   ├── context/          # React Context providers
│   │   └── ShopContext.jsx # Global state management
│   ├── pages/            # Page components
│   │   ├── Home.jsx      # Landing page
│   │   ├── Collection.jsx # Product catalog
│   │   ├── Product.jsx   # Product details
│   │   ├── Cart.jsx      # Shopping cart
│   │   ├── PlaceOrder.jsx # Checkout process
│   │   ├── Orders.jsx    # Order history
│   │   ├── Profile.jsx   # User dashboard
│   │   ├── Login.jsx     # Authentication
│   │   └── ...
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🏃‍♂️ Getting Started

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd sandwichpodcastwebstore/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the frontend root:

```env
VITE_BACKEND_URL=http://localhost:4000
```

4. **Start development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Configuration

### **Backend Integration**

The frontend connects to a Node.js/Express backend. Configure the backend URL in your environment variables.

### **Payment Setup**

**M-Pesa Configuration:**

- Requires Safaricom Daraja API credentials
- Sandbox/Production environment setup
- STK Push callback handling

**Flutterwave Setup:**

- Flutterwave account and API keys
- Card payment configuration
- Webhook setup for payment confirmation

## 📱 Key Components

### **Loading System**

Comprehensive loading states across the application:

- `PageLoading` - Full page loading
- `ButtonLoading` - Interactive button states
- `InlineLoading` - Small loading indicators
- `CardLoading` - Content card skeletons

### **Authentication Flow**

- JWT token management
- Automatic token refresh
- Protected routes
- Email verification system

### **Payment Processing**

- Dual payment gateway support
- Payment method selection
- Order confirmation flow
- Payment status tracking

### **Shopping Cart**

- Persistent cart storage
- Quantity management
- Price calculations
- Checkout integration

## 🎨 Design System

### **Color Palette**

- Primary: Blue (#2563eb)
- Secondary: Gray (#6b7280)
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Yellow (#f59e0b)

### **Typography**

- Font Family: System fonts (Inter, sans-serif)
- Responsive font sizes
- Proper font weights and line heights

### **Components**

- Consistent button styles
- Form input designs
- Card layouts
- Modal patterns

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Client-side form validation
- **XSS Protection** - Sanitized user inputs
- **HTTPS Ready** - SSL/TLS support in production

## 📊 Performance

- **Code Splitting** - Lazy loading of routes and components
- **Image Optimization** - Optimized asset loading
- **Bundle Optimization** - Minimized production builds
- **Loading States** - Improved perceived performance

## 🚀 Deployment

### **Production Build**

```bash
npm run build
```

### **Deployment Platforms**

- Vercel (recommended)
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

### **Environment Variables**

```env
VITE_BACKEND_URL=https://your-backend-url.com
VITE_FLUTTERWAVE_PUBLIC_KEY=your-flutterwave-key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- Email: <biasharasoftwares@gmail.com>
- Phone: +254114713966
- Location: Langata, Nairobi, Kenya

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by Biashara Softwares**
