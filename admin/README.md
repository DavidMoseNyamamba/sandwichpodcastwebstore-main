# 👨‍💼 Sandwich Podcast Web Store - Admin Panel

A powerful, intuitive admin dashboard for managing the ecommerce platform. Built with React 18, Vite, and Tailwind CSS, featuring real-time order management, product CRUD operations, and comprehensive loading states for optimal user experience.

## 🚀 Features

### 🔐 **Secure Admin Authentication**

- **JWT-based Login** - Secure token authentication for admin access
- **Session Management** - Persistent login sessions with localStorage
- **Protected Routes** - Admin-only access to dashboard functionality
- **Auto-logout** - Secure session handling and token management

### 📦 **Product Management**

- **Add Products** - Multi-image upload with drag-and-drop interface
- **Product Listing** - Comprehensive product catalog with search and filters
- **Edit & Delete** - Full CRUD operations for product management
- **Category Management** - Organize products by categories and subcategories
- **Inventory Tracking** - Monitor product availability and bestseller status
- **Trending Products** - Feature products as trending items

### 🛍️ **Order Management**

- **Real-time Orders** - Live order tracking and status updates
- **Order Details** - Complete order information with customer details
- **Status Updates** - Change order status (Order Placed, Packing, Shipped, Delivered)
- **Payment Tracking** - Monitor payment status and methods
- **Customer Information** - Access customer contact and delivery details

### 💡 **User Experience**

- **Loading States** - Comprehensive loading indicators for all operations
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Mobile-first design that works on all devices
- **Intuitive Interface** - Clean, modern dashboard with easy navigation
- **Error Handling** - Graceful error management with user-friendly messages

### 📊 **Dashboard Analytics**

- **Order Statistics** - Track orders by status and payment method
- **Product Performance** - Monitor bestsellers and trending items
- **Real-time Updates** - Live data synchronization with backend
- **Visual Indicators** - Color-coded status indicators for quick assessment

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18** - Modern React with hooks and latest features
- **Vite** - Lightning-fast build tool and development server
- **React Router DOM v7** - Client-side routing and navigation

### **Styling & UI**

- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom Components** - Reusable UI components with consistent styling
- **Responsive Design** - Mobile-first responsive layout
- **Loading Components** - Comprehensive loading state management

### **State Management & HTTP**

- **React Hooks** - useState, useEffect, useCallback for state management
- **Axios** - HTTP client for API communication
- **Local Storage** - Persistent token and session management

### **Development Tools**

- **ESLint** - Code linting and style enforcement
- **React Hot Refresh** - Fast refresh during development
- **PropTypes** - Runtime type checking for React props
- **React Toastify** - Toast notifications for user feedback

## 📁 Project Structure

```plaintext
admin/
├── public/
│   ├── favicon.jpg        # Admin panel favicon
│   ├── logo.png          # Brand logo
│   └── vite.svg          # Vite logo
├── src/
│   ├── assets/           # Static assets and images
│   │   ├── add_icon.png     # Add product icon
│   │   ├── admin.png        # Admin avatar
│   │   ├── logo.png         # Brand logo
│   │   ├── order_icon.png   # Orders icon
│   │   ├── parcel_icon.svg  # Shipping icon
│   │   ├── upload_area.png  # File upload area
│   │   └── assets.js        # Asset exports
│   ├── components/       # Reusable components
│   │   ├── Loading.jsx      # Loading states component
│   │   ├── Login.jsx        # Admin login form
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── Sidebar.jsx      # Side navigation menu
│   ├── pages/           # Main application pages
│   │   ├── Add.jsx          # Add new product page
│   │   ├── List.jsx         # Product listing page
│   │   └── Orders.jsx       # Order management page
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind imports
├── .env                 # Environment variables
├── eslint.config.js     # ESLint configuration
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── vercel.json         # Vercel deployment config
├── vite.config.js      # Vite configuration
└── README.md          # This documentation
```

## 🏃‍♂️ Getting Started

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn package manager
- Running backend API server
- Admin credentials for login

### **Installation**

1. **Clone the repository**

```bash
git clone <repository-url>
cd sandwichpodcastwebstore/admin
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

Create a `.env` file in the admin root:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:4000

# For production, use your deployed backend URL
# VITE_BACKEND_URL=https://your-backend-url.com
```

4. **Start the development server**

```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173`

### **Production Build**

```bash
npm run build
npm run preview
```

## 🔧 Admin Panel Pages

### **🔐 Login Page**

- **Secure Authentication** - JWT token-based admin login
- **Form Validation** - Email and password validation
- **Loading States** - Visual feedback during authentication
- **Error Handling** - Clear error messages for failed login attempts
- **Session Persistence** - Remember login state across browser sessions

### **➕ Add Product Page**

- **Multi-image Upload** - Upload up to 4 product images with preview
- **Product Details Form** - Name, description, price, and category selection
- **Size Selection** - Multiple size options (S, M, L, XL, XXL)
- **Special Flags** - Mark products as bestseller or trending
- **Form Validation** - Ensure all required fields are completed
- **Loading Feedback** - Visual indicators during product creation

### **📋 Product List Page**

- **Product Catalog** - View all products with images and details
- **Search & Filter** - Find products quickly
- **Edit Actions** - Modify product information
- **Delete Products** - Remove products with confirmation
- **Bulk Operations** - Manage multiple products efficiently
- **Loading States** - Skeleton loading for smooth UX

### **📦 Orders Management Page**

- **Order Overview** - Complete list of all customer orders
- **Order Details** - Customer info, items, amounts, and addresses
- **Status Management** - Update order status through workflow stages:
  - 📋 **Order Placed** - New orders awaiting processing
  - 📦 **Packing** - Orders being prepared for shipment
  - 🚚 **Shipped** - Orders in transit to customers
  - ✅ **Delivered** - Successfully delivered orders
- **Payment Tracking** - Monitor payment status and methods
- **Real-time Updates** - Live synchronization with backend
- **Customer Communication** - Access customer contact information

## 🎨 Component Library

### **Loading Components**

```jsx
// Button loading states
<ButtonLoading variant="primary" loading={isSubmitting}>
  Save Product
</ButtonLoading>

// Page loading states
{loading && <PageLoading message="Loading products..." />}

// Inline loading indicators
{updating && <InlineLoading size="small" />}
```

**Available Loading Variants:**

- **ButtonLoading** - Primary, secondary, danger variants
- **PageLoading** - Full-page loading with custom messages
- **InlineLoading** - Small loading indicators for inline actions
- **TableLoading** - Loading states for data tables

### **Navigation Components**

- **Navbar** - Top navigation with logout functionality
- **Sidebar** - Left navigation menu with active page indicators
- **Responsive Design** - Collapsible sidebar for mobile devices

## 🔐 Authentication Flow

### **Login Process**

1. **Admin Login** - Enter admin credentials
2. **Token Generation** - Backend validates and returns JWT token
3. **Token Storage** - Token saved to localStorage for persistence
4. **Route Protection** - Token required for all admin pages
5. **Auto-logout** - Invalid tokens redirect to login page

### **Security Features**

- **JWT Token Validation** - All API requests include authorization headers
- **Session Persistence** - Remember login state across browser sessions
- **Secure Logout** - Clear tokens and redirect to login
- **Protected Routes** - Admin pages require valid authentication

## 🌐 API Integration

### **Backend Communication**

```jsx
// API base URL from environment
export const backendUrl = import.meta.env.VITE_BACKEND_URL

// Authenticated requests
const response = await axios.post(
  `${backendUrl}/api/admin/endpoint`,
  data,
  { headers: { token: adminToken } }
)
```

### **Key API Endpoints Used**

- **POST /api/user/adminlogin** - Admin authentication
- **GET /api/product/list** - Fetch all products
- **POST /api/product/add** - Add new product
- **POST /api/product/remove** - Delete product
- **POST /api/order/list** - Fetch all orders
- **POST /api/order/status** - Update order status

## 📱 Responsive Design

### **Mobile-First Approach**

- **Collapsible Sidebar** - Space-efficient navigation on small screens
- **Touch-Friendly Interface** - Optimized for touch interactions
- **Responsive Tables** - Scrollable tables on mobile devices
- **Adaptive Layouts** - Components adjust to screen size
- **Mobile Navigation** - Hamburger menu for compact navigation

### **Breakpoint Design**

- **Mobile (< 768px)** - Single column layout with collapsible sidebar
- **Tablet (768px - 1024px)** - Partial sidebar with main content
- **Desktop (> 1024px)** - Full sidebar with spacious layout

## 🚀 Deployment

### **Environment Setup**

1. **Build for Production**

```bash
npm run build
```

2. **Environment Variables**

```env
# Production backend URL
VITE_BACKEND_URL=https://your-backend-api.com
```

### **Deployment Platforms**

#### **Vercel (Recommended)**

```bash
# Deploy with Vercel CLI
npm install -g vercel
vercel --prod
```

#### **Netlify**

```bash
# Build command: npm run build
# Publish directory: dist
```

#### **Manual Deployment**

```bash
npm run build
# Deploy the 'dist' folder to your web server
```

### **Production Checklist**

- [ ] Environment variables configured
- [ ] Backend API URL updated for production
- [ ] Build optimization completed
- [ ] Assets properly compressed
- [ ] HTTPS certificate configured
- [ ] Domain name configured
- [ ] Admin credentials secure
- [ ] Error monitoring setup (optional)

## 🎯 Key Features Deep Dive

### **Product Management Workflow**

1. **Add Product**
   - Upload multiple product images
   - Fill in product details (name, description, price)
   - Select category and subcategory
   - Choose available sizes
   - Set bestseller/trending flags
   - Submit with validation

2. **Manage Products**
   - View complete product catalog
   - Search and filter products
   - Edit product information
   - Delete products with confirmation
   - Track inventory status

### **Order Management Workflow**

1. **Order Processing**
   - View new incoming orders
   - Access complete order details
   - Verify payment status
   - Update order status through stages

2. **Status Management**
   - **Order Placed** → **Packing** → **Shipped** → **Delivered**
   - Real-time status updates
   - Customer notification integration
   - Payment confirmation tracking

### **User Experience Enhancements**

- **Loading States** - Every action has appropriate loading feedback
- **Toast Notifications** - Success/error messages for all operations
- **Error Boundaries** - Graceful error handling and recovery
- **Optimistic Updates** - Immediate UI feedback before API confirmation
- **Data Persistence** - Form data preserved during navigation

## 🔧 Development

### **Available Scripts**

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### **Development Workflow**

1. **Start Backend** - Ensure API server is running
2. **Environment Setup** - Configure `.env` file
3. **Start Development** - Run `npm run dev`
4. **Live Reload** - Changes reflect immediately
5. **Testing** - Test all features before deployment

## 🐛 Troubleshooting

### **Common Issues**

**Login Issues:**

- Verify backend URL in `.env` file
- Check admin credentials
- Ensure backend server is running

**Image Upload Problems:**

- Check file size limits
- Verify Cloudinary configuration in backend
- Ensure proper file formats (PNG, JPG, JPEG)

**Loading States:**

- Verify API endpoints are responding
- Check network connectivity
- Monitor browser console for errors

### **Error Handling**

```jsx
// Example error handling pattern
try {
  setLoading(true)
  const response = await axios.post(endpoint, data)
  if (response.data.success) {
    toast.success('Operation successful!')
  } else {
    toast.error(response.data.message)
  }
} catch (error) {
  console.error('Error:', error)
  toast.error('Something went wrong. Please try again.')
} finally {
  setLoading(false)
}
```

## 📊 Performance Optimization

### **Loading Performance**

- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Compressed images with proper formats
- **Bundle Splitting** - Code splitting for faster initial loads
- **Caching** - Browser caching for static assets

### **User Experience**

- **Skeleton Loading** - Placeholder content while loading
- **Optimistic Updates** - Immediate UI feedback
- **Error Recovery** - Graceful error handling and retry options
- **Responsive Design** - Fast loading on all devices

## 📞 Support & Contact

### **Development Support**

- **Email**: <biasharasoftwares@gmail.com>
- **Phone**: +254114713966
- **Location**: Langata, Nairobi, Kenya

### **Admin Panel Features**

- **Live Chat**: Contact support directly from admin panel
- **Documentation**: Comprehensive feature documentation
- **Video Tutorials**: Step-by-step usage guides
- **24/7 Support**: Technical assistance available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-admin-feature`)
3. Commit your changes (`git commit -m 'Add amazing admin feature'`)
4. Push to the branch (`git push origin feature/amazing-admin-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Built with ❤️ by Biashara Softwares

*Empowering businesses with powerful, intuitive admin tools for seamless ecommerce management.*
