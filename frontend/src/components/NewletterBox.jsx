
const NewletterBox = () => {

    const onSubmitHandler=()=>{
        event.preventDefault()
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe to our newsletter</p>
      <p className="text-gray-700 mt-3">
        Stay updated with our latest offers, trends, 
        and exclusive deals by subscribing to our newsletter today!
        </p>
        <form onSubmit={onSubmitHandler} className="border-blue-600 w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required/>
            <button className="bg-blue-700 text-white text-xs px-10 py-4" type="submit">SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewletterBox
