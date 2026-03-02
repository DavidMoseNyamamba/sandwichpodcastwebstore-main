import { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/assets'
import {Link, NavLink, useLocation} from 'react-router-dom'


const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const location = useLocation();

    const {setShowSearch, getCartCount, navigate, token, setToken,setCartItems} = useContext(ShopContext)

    // Close mobile menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (visible) {
                setVisible(false);
            }
        };

        if (visible) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visible]);

    const logout =()=>{
        navigate('/login')
        setToken('')
        localStorage.removeItem('token')
        setCartItems({})
        
    }

  return (
    <div className='relative flex items-center justify-between py-5 font-medium'>

      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-900'>
            <NavLink to='/' className='flex flex-col items-center gap-1 hover:scale-110 transition ease-in-out font-semibold'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
            </NavLink>

            <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:scale-110 transition ease-in-out font-semibold'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
            </NavLink>

            <NavLink to='/about' className='flex flex-col items-center gap-1 hover:scale-110 transition ease-in-out font-semibold'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' />
            </NavLink>

            <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:scale-110 transition ease-in-out font-semibold'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            {/* Show search only on collections page */}
            {location.pathname === '/collection' && (
                <div className='flex flex-col items-center gap-1'>
                    <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer hover:scale-110 transition ease-in-out' alt="" />
                    <span className='text-xs text-gray-600'>Search</span>
                </div>
            )}

            <div className='group relative'>
              
               {/* <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer hover:scale-110 transition ease-in-out' src={assets.profile_icon} alt="" /> */}
                <div className='flex flex-col items-center gap-1'>
                    <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer hover:scale-110 transition ease-in-out' src={assets.profile_icon} alt="" />
                    <span className='text-xs text-gray-600'>{token ? 'Profile' : 'Sign up/Log in'}</span>
                </div>
               
               {/* dropdown */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-500 rounded shadow-lg'>
                        <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-blue-600'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-blue-600'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-blue-600'>Logout</p>
                    </div>
                </div>}
            </div>

            <Link to='/cart' className='relative flex flex-col items-center gap-1'>
                <div className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </div>
                <span className='text-xs text-gray-600'>Cart</span>
            </Link>
             <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
        {/* Sidebar menu for small screen */}
        <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-none transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-blue-600 w-64 h-full bg-blue-100 shadow-2xl border-l border-gray-200 ml-auto'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                    <p className='font-medium'>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-4 pl-8 text-lg font-medium hover:bg-gray-100 hover:text-black transition-colors text-left border-b border-gray-50' to='/'>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-4 pl-8 text-lg font-medium hover:bg-gray-100 hover:text-black transition-colors text-left border-b border-gray-50' to='/collection'>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-4 pl-8 text-lg font-medium hover:bg-gray-100 hover:text-black transition-colors text-left border-b border-gray-50' to='/about'>About</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-4 pl-8 text-lg font-medium hover:bg-gray-100 hover:text-black transition-colors text-left border-b border-gray-50' to='/contact'>Contact</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar 