import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext)

  return (
    <Link className='shadow-md hover:shadow-lg transition-shadow border border-blue-300 text-gray-700 cursor-pointer' to ={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-black font-semibold'>{name}</p>
        <p className='text-sm font-medium text-blue-600'>{currency}<span className='text-lg text-green-600 font-bold'>{price}</span></p>
    </Link>
  )
}
ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default ProductItem
