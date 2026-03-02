const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-40 bg-gray-900 p-5 mb-5">
      {/* Animated border */}
      <div className="h-16 w-64 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-1">
        <div className="bg-gray-900 rounded-lg h-full w-full flex items-center justify-center">
          <h1 className="text-sm md:text-lg font-bold text-white tracking-wider ">
            OPENING SOON
          </h1>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon