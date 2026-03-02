import { assets } from '../assets/assets'
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Footer = () => {

  const {navigate} = useContext(ShopContext)

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='mb-5 w-32' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-950'>
            Discover the latest trends, shop top-quality products, 
            and connect with us for exclusive updates. 
            Your satisfaction is our priority!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-blue-600 cursor-pointer'>
                <li onClick={()=>navigate('/')}>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-blue-600 cursor-pointer'>
                <p><FaPhoneVolume />+254743091157</p><br />
                <p> <MdEmail />sandwichpodcast@gmail.com</p>
            </ul>
        </div>
      </div>
    <div>
        <hr />
        <p className='py-5 text-sm text-center'> Copyright 2025 - All Rights Reserved</p>
        <p className='py-5 text-sm text-center'>Built by <a 
        className='bg-blue-700 text-white px-2 py-1 rounded' 
        href="https://biasharasoftwares.co.ke" 
        target="_blank" 
    rel="noopener noreferrer" >Biashara Softwares</a></p>
    </div>

    </div>
  )
}

export default Footer
