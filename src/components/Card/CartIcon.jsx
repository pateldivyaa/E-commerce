import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiTrash2, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartRef = useRef(null)
  const { 
    cart, 
    cartItemsCount, 
    cartTotal, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart()

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={cartRef}>
      {/* Cart Icon Button */}
      <button
        className="relative p-2 text-neutral-700 hover:text-primary-800 transition-colors focus:outline-none"
        onClick={() => setIsCartOpen(!isCartOpen)}
        aria-label="Shopping cart"
      >
        <FiShoppingCart size={24} />
        
        {/* Cart Counter Badge */}
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-4 border-b border-neutral-100">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Shopping Cart ({cartItemsCount})</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-neutral-500 hover:text-neutral-800"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                  {/* Cart Items */}
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-neutral-100">
                      {/* Item Image */}
                      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        
                        {/* Selected Options */}
                        <div className="text-xs text-neutral-500 mt-1">
                          {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          {/* Price */}
                          <span className="text-primary-800 font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          
                          {/* Quantity Control */}
                          <div className="flex items-center border rounded">
                            <button
                              className="px-2 py-1 text-xs border-r"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-xs">{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-xs border-l"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-accent-600 self-start mt-1"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Cart Footer */}
                <div className="p-4 bg-neutral-50">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold text-primary-800">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      to="/cart"
                      className="flex-1 bg-primary-800 hover:bg-primary-700 text-white text-center py-2 px-4 rounded"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      className="flex-1 bg-accent-600 hover:bg-accent-700 text-white text-center py-2 px-4 rounded"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                  
                  {/* Clear Cart Button */}
                  <button
                    onClick={clearCart}
                    className="w-full text-neutral-500 text-sm mt-2 hover:text-accent-600"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                  <FiShoppingCart size={24} className="text-neutral-500" />
                </div>
                <p className="text-neutral-600 mb-4">Your cart is empty</p>
                <Link
                  to="/shop"
                  className="inline-block bg-primary-800 hover:bg-primary-700 text-white py-2 px-4 rounded"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CartIcon