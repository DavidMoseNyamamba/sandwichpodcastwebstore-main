import { useContext, useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets' // Adjust the path as necessary
import RelatedProducts from '../components/RelatedProducts'
import { ButtonLoading } from '../components/Loading'

const Product = () => {

  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!size) {
      // Add toast notification if size is not selected
      return
    }
    
    setIsAddingToCart(true)
    try {
      await addToCart(productData._id, size)
      // You could add a success toast here
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Add error toast here
    } finally {
      setIsAddingToCart(false)
    }
  }

  const location = useLocation();

  const fetchProductData = async() =>{

      products.map((item) =>{
        if(item._id == productId){
          setProductData(item)
          setImage(item.image[0])
          return null
        }
      })
  }

  useEffect(()=>{
    fetchProductData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productId,products])

  // Scroll to top when component loads or when product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // or 'auto' for instant scroll
    });
  }, [location.pathname]); // Re-run when URL changes

  return productData ? (
    < div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* products details */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name} </h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium text-blue-600'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <ButtonLoading 
              onClick={handleAddToCart}
              isLoading={isAddingToCart}
              disabled={isAddingToCart || !size}
              className='bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-colors disabled:opacity-50'
            >
              ADD TO CART
            </ButtonLoading>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original</p>
              <p>Easy Return and Exchange Policy in 7 days</p>

            </div>
        </div>
      </div>
      {/* Description and reviews */}
      <div className='mt-20'>
          <div className="flex">
            <b className='border py-3 px-5 text-sm'>Description</b>
            <p className='border py-3 px-5 text-sm'>Reviews(90)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Experience unmatched quality and innovation with 
                this exceptional product. Designed with precision 
                and care, it offers a perfect balance of functionality 
                and style. Ideal for everyday use, it promises 
                reliability, durability, and satisfaction, 
                making it a valuable addition to your collection.</p>

                <p>This product combines elegance and practicality, 
                  offering top-notch performance, durability, 
                  and style—perfect for enhancing your daily 
                  experiences.</p>
          </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'>
    </div>
}

export default Product
