import { useState } from 'react';
// Import an upload icon similar to the ones you use in your Add Items page
// import { upload_icon } from '../assets'; 

const VisualSearch = () => {
  const [image, setImage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image first.");

    setIsLoading(true);
    
    // Create form data to send to your backend
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://localhost:4000/api/product/visual-search', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.products);
      } else {
        alert("Search failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl pt-5 sm:pt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Inventory Visual Search</h2>
      
      <form onSubmit={handleSearch} className="flex flex-col gap-6 items-start">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">Upload Query Image</p>
          <label htmlFor="visual-search-image" className="cursor-pointer">
            {/* If you have the upload icon from your screenshot, use it here */}
            <img 
              className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-md p-1" 
              src={!image ? "/upload_area.png" : URL.createObjectURL(image)} 
              alt="Upload area" 
            />
            <input 
              onChange={(e) => setImage(e.target.files[0])} 
              type="file" 
              id="visual-search-image" 
              hidden 
              accept="image/*"
            />
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-[#00c2cb] hover:bg-[#00a8b0] text-white py-2 px-8 rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Scanning Inventory...' : 'Search Products'}
        </button>
      </form>

      {/* Results Display Area */}
      {searchResults.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Top Matches</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {searchResults.map((product, index) => (
              <div key={index} className="border p-3 rounded-md shadow-sm bg-white">
                <img src={product.image[0]} alt={product.name} className="w-full h-32 object-contain mb-2" />
                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category} - {product.subCategory}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">${product.price}</p>
                <p className="text-xs text-green-600 mt-1">
                  Similarity: {(product.similarityScore * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualSearch;