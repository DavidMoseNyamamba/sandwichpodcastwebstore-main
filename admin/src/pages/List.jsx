import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { PageLoading, ButtonLoading } from '../components/Loading'

const List = ({token}) => {

  const [list, setList] = useState([]) 
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      setDeletingId(id)
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setDeletingId(null)
    }
  }

  const startEdit = (item) => {
    setEditingId(item._id)
    setEditPrice(item.price.toString())
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditPrice('')
  }

  const updatePrice = async (id) => {
    if (!editPrice || isNaN(editPrice) || Number(editPrice) <= 0) {
      toast.error('Please enter a valid price')
      return
    }

    try {
      setUpdatingId(id)
      const response = await axios.post(
        backendUrl + '/api/product/update-price', 
        { id, price: Number(editPrice) }, 
        { headers: { token } }
      )
      
      if (response.data.success) {
        toast.success('Price updated successfully')
        setEditingId(null)
        setEditPrice('')
        await fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return <PageLoading text="Loading products..." />
  }

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-medium text-gray-700'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product list */}
        {list.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border-b text-sm'>
            <img className='w-20 h-20 object-cover' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            
            {/* Price cell with edit functionality */}
            <div>
              {editingId === item._id ? (
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className='border rounded px-2 py-1 w-24'
                  placeholder='Price'
                  min='0'
                  step='0.01'
                />
              ) : (
                <p>{currency}{item.price}</p>
              )}
            </div>

            {/* Action buttons */}
            <div className='flex gap-2 justify-center flex-wrap'>
              {editingId === item._id ? (
                <>
                  <ButtonLoading
                    onClick={() => updatePrice(item._id)}
                    isLoading={updatingId === item._id}
                    disabled={updatingId === item._id}
                    variant="success"
                    size="sm"
                    className='text-green-600 hover:text-green-800'
                  >
                    Save
                  </ButtonLoading>
                  <button
                    onClick={cancelEdit}
                    className='text-gray-600 hover:text-gray-800'
                    disabled={updatingId === item._id}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(item)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    Edit
                  </button>
                  <ButtonLoading
                    onClick={() => removeProduct(item._id)}
                    isLoading={deletingId === item._id}
                    disabled={deletingId === item._id}
                    variant="danger"
                    size="sm"
                    className='text-red-600 hover:text-red-800'
                  >
                    Delete
                  </ButtonLoading>
                </>
              )}
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List
