import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import EmailVerification from './pages/EmailVerification'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer} from 'react-toastify';
import Mpesa from './components/Mpesa'
import Flutterwave from './components/Flutterwave'
import MpesaVerification from './pages/MpesaVerification'
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gradient-to-b from-blue-500 to-white-100  h-64 w-full'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Analytics />
      {/* adding the routes */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/verify-email' element={<EmailVerification/>} />
        <Route path='/mpesa' element={<Mpesa />} />
        <Route path='/flutterwave' element={<Flutterwave />} />
        <Route path='/mpesa-verification' element={<MpesaVerification />} />
      </Routes>

      <Footer/>

    </div>
  )
}

export default App
