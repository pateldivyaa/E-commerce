import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiTrash2, FiShoppingBag, FiUser, FiPackage } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useToast } from '../components/Card/ToastContext'

const CartPage = () => {
  const { 
    cart, 
    cartItemsCount, 
    cartTotal, 
    updateQuantity, 
    removeFromCart,
    clearCart,
    loading,
    error,
    loadCart,
    cartData
  } = useCart()
  
  const { showToast } = useToast()
  const [imageErrors, setImageErrors] = useState({})

  // Reload cart when component mounts to ensure we have fresh data
  useEffect(() => {
    loadCart()
  }, [])

  // Handle image loading errors
  const handleImageError = (itemId) => {
    setImageErrors(prev => ({
      ...prev,
      [itemId]: true
    }))
  }

  // Get image URL with fallback
  const getImageUrl = (item) => {
    if (imageErrors[item.id]) {
      return '/api/placeholder/150/150' // Fallback placeholder
    }
    
    // If image URL starts with 'uploads/', prepend the base URL
    if (item.image && item.image.startsWith('uploads/')) {
      return `http://localhost:3000/${item.image}`
    }
    
    // If image URL starts with '/image/', use it as is (matches your backend static route)
    if (item.image && item.image.startsWith('/image/')) {
      return `http://localhost:3000${item.image}`
    }
    
    // If it's a full URL, use it as is
    if (item.image && (item.image.startsWith('http://') || item.image.startsWith('https://'))) {
      return item.image
    }
    
    // Default case - prepend /image/
    return item.image ? `http://localhost:3000/image/${item.image}` : '/api/placeholder/150/150'
  }

  // Show loading state
  if (loading && cart.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error && cart.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <FiShoppingBag size={32} className="text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Error Loading Cart</h1>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            {error}
          </p>
          <button 
            onClick={loadCart}
            className="btn-primary inline-flex items-center gap-2"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 mb-6">
            <FiShoppingBag size={32} className="text-neutral-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
            Browse our products and find something you'll love!
          </p>
          <Link 
            to="/shop" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiChevronLeft size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity, showToast)
  }
  
  const handleRemoveFromCart = (id) => {
    removeFromCart(id, showToast)
  }
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart(showToast)
    }
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      {/* Header Section with User Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        
        {/* User Information Display */}
        {cartData?.userId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FiUser className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-blue-900">
                  Cart Owner: {cartData.userId.name || 'User'}
                </h3>
                <p className="text-sm text-blue-600">
                  {cartData.userId.email || 'No email provided'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Cart Summary */}
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span className="flex items-center gap-1">
            <FiPackage size={16} />
            {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'}
          </span>
          <span>•</span>
          <span className="font-medium text-primary-800">
            Total: ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* Loading overlay for updates */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-6 py-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-800"></div>
            <span>Updating cart...</span>
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {/* Table Header - Desktop Only */}
          <div className="hidden md:flex border-b border-neutral-200 pb-4 text-neutral-600 font-medium">
            <div className="w-2/5">Product</div>
            <div className="w-1/5 text-center">Price</div>
            <div className="w-1/5 text-center">Quantity</div>
            <div className="w-1/5 text-right">Subtotal</div>
          </div>
          
          {/* Cart Items List */}
          <div className="divide-y divide-neutral-200">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-6 flex flex-col md:flex-row md:items-center"
              >
                {/* Product Info */}
                <div className="flex gap-4 w-full md:w-2/5 mb-4 md:mb-0">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={getImageUrl(item)}
                      alt={item.name || 'Product'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      onError={() => handleImageError(item.id)}
                      onLoad={() => {
                        // Remove from error state if image loads successfully
                        setImageErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors[item.id]
                          return newErrors
                        })
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-medium text-lg text-gray-900 truncate">
                      {item.name || 'Unnamed Product'}
                    </h3>
                    
                    {/* Product Description */}
                    {item.description && (
                      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    
                    {/* Product Details */}
                    <div className="text-sm text-neutral-500 mt-2 space-y-1">
                      {item.category && (
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        </div>
                      )}
                      
                      {/* Selected Options */}
                      {item.selectedSize && (
                        <div>Size: <span className="text-neutral-700 font-medium">{item.selectedSize}</span></div>
                      )}
                      {item.selectedColor && (
                        <div>Color: <span className="text-neutral-700 font-medium">{item.selectedColor}</span></div>
                      )}
                      
                      {/* Product ID for reference */}
                      <div className="text-xs text-neutral-400">
                        ID: {item.productId || item.id}
                      </div>
                    </div>
                    
                    {/* Mobile Price */}
                    <div className="md:hidden text-primary-800 font-bold text-lg mt-2">
                      ${Number(item.price || 0).toFixed(2)}
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 mt-3 self-start disabled:opacity-50 transition-colors"
                    >
                      <FiTrash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                
                {/* Price - Desktop */}
                <div className="hidden md:block w-1/5 text-center">
                  <div className="text-primary-800 font-bold text-lg">
                    ${Number(item.price || 0).toFixed(2)}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="flex justify-between items-center md:justify-center md:w-1/5 mt-4 md:mt-0">
                  <span className="md:hidden font-medium">Quantity:</span>
                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1 || loading}
                      className="px-4 py-2 hover:bg-neutral-50 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
                    >
                      -  
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center font-medium bg-neutral-50">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={loading} 
                      className="px-4 py-2 hover:bg-neutral-50 disabled:cursor-not-allowed transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div className="flex justify-between md:justify-end md:w-1/5 mt-4 md:mt-0">
                  <span className="md:hidden font-medium">Subtotal:</span>
                  <span className="text-primary-800 font-bold text-lg">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
            </div>
          
          {/* Cart Actions */}
          <div className="flex flex-wrap gap-4 justify-between items-center mt-8 pb-8 border-b border-neutral-200">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium"
            >
              <FiChevronLeft size={18} />
              Continue Shopping
            </Link>
                    
            <button
              onClick={handleClearCart}
              disabled={loading}
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 disabled:opacity-50 font-medium"
            >
              <FiTrash2 size={18} />
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-neutral-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            {/* Cart Statistics */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-600">Items in cart</span>
                <span className="font-medium">{cartItemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span>Calculated at checkout</span> l   
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary-800">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-primary-800 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 mb-4 transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-3">Secure checkout powered by SSL</p>
              
              {/* Accepted Payment Methods */}
              <div className="flex justify-center gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                  <div key={method} className="bg-white p-2 rounded border border-neutral-200 text-xs">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage