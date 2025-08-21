import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiZap, FiTrendingUp } from 'react-icons/fi'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../Card/ToastContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { showToast, showCartSuccess } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null)
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : null)
  const [isAdding, setIsAdding] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent multiple clicks
    if (isAdding) return
    
    try {
      setIsAdding(true)
      
      // Create a unique ID for cart item (including size and color for variants)
      const cartItemId = `${product._id}${selectedSize ? `_${selectedSize}` : ''}${selectedColor ? `_${selectedColor}` : ''}`
      
      // Create a product object with selected options
      const productToAdd = {
        id: cartItemId, // Use unique ID for cart
        productId: product._id, // Keep original product ID
        name: product.name || product.title,
        price: Number(product.price) || 0,
        image: product.image,
        selectedSize,
        selectedColor,
        quantity: 1
      }
      
      console.log('Adding to cart:', productToAdd)
      
      // Add to cart using context with toast callback
      addToCart(productToAdd, showCartSuccess || showToast)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Show error toast
      const errorToast = showToast || showCartSuccess
      if (errorToast && typeof errorToast === 'function') {
        errorToast('Error adding item to cart. Please try again.', 'error')
      }
    } finally {
      // Add a small delay to prevent rapid clicking
      setTimeout(() => {
        setIsAdding(false)
      }, 500)
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

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // Add wishlist functionality here
  }

  const discountPercentage = product.discount || 0
  const originalPrice = product.price || 0
  const discountedPrice = discountPercentage ? originalPrice * (1 - discountPercentage / 100) : originalPrice
  
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200/50 hover:border-primary-300/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Badge */}
      {(discountPercentage > 0 || product.featured) && (
        <div className="absolute top-4 left-4 z-20">
          {discountPercentage > 0 ? (
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <FiZap className="w-3 h-3" />
              {discountPercentage}% OFF
            </div>
          ) : product.featured && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" />
              FEATURED
            </div>
          )}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Add to Wishlist"
      >
        <FiHeart 
          size={18} 
          className={`transition-all duration-300 ${
            isWishlisted 
              ? 'text-red-500 fill-red-500' 
              : 'text-gray-600 hover:text-red-500'
          }`} 
        />
      </button>

      {/* Product Image with Enhanced Overlay */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}
        
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.name || product.title} 
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg'
              setImageLoaded(true)
            }}
          />
        </Link>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Quick View Button */}
        <Link 
          to={`/product/${product._id}`}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <FiEye className="w-4 h-4" />
           View
        </Link>
        
        {/* Enhanced Quick Actions */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/95 via-white/90 to-transparent backdrop-blur-sm transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          {/* Size Selection - Compact Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-600 mb-2">Size:</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.slice(0, 4).map(size => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeChange(e, size)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                      selectedSize === size 
                        ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white border-primary-500 shadow-lg scale-110' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    {size}
                  </button>
                ))}
                {product.sizes.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    +{product.sizes.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Color Selection - Enhanced Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-600 mb-2">Color:</div>
              <div className="flex flex-wrap gap-2">
                {product.colors.slice(0, 5).map(color => (
                  <button
                    key={color}
                    onClick={(e) => handleColorChange(e, color)}
                    className={`w-7 h-7 rounded-full border-3 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color 
                        ? 'border-primary-500 shadow-lg ring-2 ring-primary-200' 
                        : 'border-white shadow-md hover:border-gray-300'
                    }`}
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      boxShadow: selectedColor === color ? `0 0 0 2px ${color}, 0 0 20px ${color}40` : undefined
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 5 && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 border-3 border-white shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+{product.colors.length - 5}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Enhanced Action Button - Removed Shadows */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${
              isAdding 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white hover:scale-105'
            }`}
          >
            <FiShoppingCart size={16} className={isAdding ? 'animate-pulse' : 'animate-bounce'} />
            <span>{isAdding ? 'Adding to Cart...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      {/* Enhanced Product Details */}
      <div className="p-6 relative">
        {/* Product Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              size={12} 
              className={`${
                i < (product.rating || 4) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews || Math.floor(Math.random() * 100) + 10})
          </span>
        </div>

        <Link to={`/product/${product._id}`} className="group">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {product.name || product.title}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        {/* Enhanced Price Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discountPercentage > 0 ? (
              <>
                <span className="text-xl font-bold text-primary-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-800">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${
              product.stock > 10 ? 'bg-green-500' : 
              product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {product.stock > 10 ? 'In Stock' : 
               product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Category Tag */}
        {product.category && (
          <div className="mt-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors duration-300">
              {product.category}
            </span>
          </div>
        )}
      </div>

      {/* Floating Elements for Premium Feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-purple-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-500/10 to-orange-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
      </div>
    </div>
  )
}

export default ProductCard