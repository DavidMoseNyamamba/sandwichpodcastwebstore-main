import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Trending = () => {

    const {getTrendingProducts} = useContext(ShopContext)
    const [trendingProducts, setTrendingProducts] = useState([])

    useEffect(()=>{
        const trending = getTrendingProducts()
        console.log('All trending products:', trending)
        console.log('Number of trending products found:', trending.length)
        setTrendingProducts(trending.slice(0,10))
    },[getTrendingProducts])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'TRENDING'} text2={'PRODUCTS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Explore our trending products, featuring the latest and most popular items.
        </p>
      </div>

      {trendingProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                trendingProducts.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
      ) : (
        <div className='text-center py-8'>
          <p className='text-gray-500'>No trending products found</p>
        </div>
      )}

    </div>
  )
}

export default Trending
