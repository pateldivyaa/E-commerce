import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../contexts/ToastContext'

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart()
  const { showToast, showCartSuccess } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null)
  const [isAdding, setIsAdding] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  console.log('ProductCard received product:', product)
  
  // Get proper image URL
  const getImageUrl = () => {
    if (imageError) {
      return '/api/placeholder/300/300' // Fallback placeholder
    }
    
    if (!product.image) {
      return '/api/placeholder/300/300'
    }
    
    // If image URL starts with 'uploads/', prepend the base URL
    if (product.image.startsWith('uploads/')) {
      return `http://localhost:3000/${product.image}`
    }
    
    // If image URL starts with '/image/', use it as is (matches your backend static route)
    if (product.image.startsWith('/image/')) {
      return `http://localhost:3000${product.image}`
    }
    
    // If it's a full URL, use it as is
    if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
      return product.image
    }
    
    // Default case - prepend /image/
    return `http://localhost:3000/image/${product.image}`
  }
  
  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      setIsAdding(true)
      
      console.log('ProductCard - Adding to cart:', product)
      
      // મહત્વપૂર્ણ: Backend માં productId અને quantity જોઈએ છે
      // product._id એ MongoDB નો actual ID છે જે backend ને જોઈએ છે
      const productToAdd = {
        productId: product._id, // આ મહત્વપૂર્ણ છે - backend માં એ productId તરીકે expect કરે છે
        name: product.name || product.title,
        title: product.title || product.name,
        price: Number(product.price) || 0,
        image: product.image,
        description: product.description,
        category: product.category,
        selectedSize,
        selectedColor,
        quantity: 1 // Backend માં quantity જરૂરી છે
      }
      
      console.log('ProductCard - Prepared product data:', productToAdd)
      
      // Toast callback function ને determine કરો
      const toastCallback = showCartSuccess || showToast
      
      // Add to cart using context
      await addToCart(productToAdd, toastCallback)
      
      console.log('ProductCard - Successfully added to cart')
      
    } catch (error) {
      console.error('ProductCard - Error adding to cart:', error)
      
      // Show error toast
      const errorToast = showToast || showCartSuccess
      if (errorToast && typeof errorToast === 'function') {
        errorToast('Error adding item to cart. Please try again.', 'error')
      }
    } finally {
      setIsAdding(false)
    }
  }
  
  const handleSizeChange = (e, size) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedSize(size)
  }
  
  const handleColorChange = (e, color) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedColor(color)
  }
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  // Check if we're currently adding this specific product
  const isCurrentlyAdding = isAdding || loading
  
  return (
    <div 
      className="group relative bg-white dark:bg-secondary-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-secondary-700 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Quick Actions Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product._id}`}>
          <img 
            src={getImageUrl()}
            alt={product.name || product.title || 'Product'} 
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            onError={handleImageError}
            onLoad={() => setImageError(false)}
          />
        </Link>
        
        {/* Product Badge */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-800 text-white px-3 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>
        )}
        
        {/* Quick View Button */}
        <div className={`absolute top-3 right-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <Link 
            to={`/product/${product._id}`}
            className="w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg transition-colors"
            title="Quick View"
          >
            <FiEye size={18} className="text-gray-600" />
          </Link>
        </div>
        
        {/* Quick Actions */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-secondary-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex gap-2 mb-3">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isCurrentlyAdding}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                isCurrentlyAdding 
                  ? 'bg-neutral-400 text-white cursor-not-allowed' 
                  : 'bg-primary-800 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <FiShoppingCart size={16} />
              <span>
                {isCurrentlyAdding ? 'Adding...' : 'Add to Cart'}
              </span>
            </button>
            
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Add wishlist functionality here
                const toastCallback = showToast || showCartSuccess
                if (toastCallback) {
                  toastCallback('Added to wishlist!', 'success')
                }
              }}
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-neutral-300 dark:border-secondary-600 hover:border-neutral-400 dark:hover:border-secondary-500 hover:bg-neutral-50 transition-colors"
              title="Add to Wishlist"
            >
              <FiHeart size={18} className="text-neutral-600 dark:text-gray-300" />
            </button>
          </div>
          
          {/* Size Selection - Show only if product has sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-neutral-500 dark:text-gray-400 mb-2 font-medium">Size:</div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeChange(e, size)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-primary-800 text-white shadow-md' 
                        : 'bg-neutral-200 dark:bg-secondary-700 text-neutral-600 dark:text-gray-300 hover:bg-neutral-300 dark:hover:bg-secondary-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection - Show only if product has colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <div className="text-xs text-neutral-500 dark:text-gray-400 mb-2 font-medium">Color:</div>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={(e) => handleColorChange(e, color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-primary-800 scale-110' 
                        : 'border-neutral-300 dark:border-secondary-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white hover:text-primary-800 transition-colors line-clamp-1">
            {product.name || product.title || 'Unnamed Product'}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-neutral-500 dark:text-gray-400 mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary-800 dark:text-primary-400">
              ${Number(product.price || 0).toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Rating or additional info */}
          <div className="text-xs text-neutral-400">
            ID: {product._id?.slice(-6)}
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {isCurrentlyAdding && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-xl">
          <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-800"></div>
            <span className="text-sm font-medium">Adding to cart...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard