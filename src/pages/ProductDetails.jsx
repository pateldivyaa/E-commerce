import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiShoppingBag, 
  FiHeart, 
  FiShare2, 
  FiChevronRight, 
  FiStar, 
  FiMinus, 
  FiPlus, 
  FiTruck, 
  FiShield, 
  FiRepeat,
  FiCheck
} from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'
import { allProducts } from '../data/mockData'
import { formatPrice, calculateDiscountPrice } from '../utils/helpers'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  
  const { addToCart } = useCart()
  
  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = () => {
      setLoading(true)
      
      setTimeout(() => {
        const foundProduct = allProducts.find(p => p.id.toString() === id)
        
        if (foundProduct) {
          setProduct(foundProduct)
          // Set default color and size if available
          if (foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0])
          }
          if (foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0])
          }
        }
        
        setLoading(false)
      }, 500)
    }
    
    fetchProduct()
  }, [id])
  
  const handleAddToCart = () => {
    if (product) {
      if (product.colors.length > 0 && !selectedColor) {
        alert('Please select a color')
        return
      }
      
      if (product.sizes.length > 0 && !selectedSize) {
        alert('Please select a size')
        return
      }
      
      addToCart({
        ...product,
        selectedColor,
        selectedSize
      }, quantity)
      
      // Show notification
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  
  // Assume product has multiple images now
  const getProductImages = () => {
    if (!product) return []
    
    // For demo purposes, create an array of "images" based on the main image
    return [
      product.image,
      product.image.replace('.jpg', '-2.jpg'),
      product.image.replace('.jpg', '-3.jpg'),
      product.image.replace('.jpg', '-4.jpg')
    ]
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-50">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 border-4 border-t-accent-500 border-neutral-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-600 font-medium">Loading product details...</p>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-primary-900">Product Not Found</h2>
          <p className="text-lg text-neutral-600 mb-8">We couldn't find the product you're looking for. It might have been removed or is temporarily unavailable.</p>
          <Link to="/shop" className="btn-primary inline-flex items-center px-6 py-3 text-lg">
            <FiShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }
  
  const discountedPrice = product.discount 
    ? calculateDiscountPrice(product.price, product.discount)
    : product.price
  
  const productImages = getProductImages()
  
  return (
    <div className="bg-white">
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 right-6 z-50 bg-green-50 border border-green-200 shadow-lg rounded-lg px-4 py-3 flex items-center"
          >
            <FiCheck className="text-green-500 mr-2" size={20} />
            <p className="text-green-800 font-medium">Added to cart successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-neutral-100 to-white py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 text-neutral-500">
            <Link to="/" className="hover:text-accent-600 transition-colors">Home</Link>
            <FiChevronRight className="mx-2" />
            <Link to="/shop" className="hover:text-accent-600 transition-colors">Shop</Link>
            <FiChevronRight className="mx-2" />
            <Link to={`/shop/${product.category}`} className="hover:text-accent-600 transition-colors capitalize">{product.category}</Link>
            <FiChevronRight className="mx-2" />
            <span className="text-neutral-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-neutral-50 rounded-2xl overflow-hidden aspect-square"
            >
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent-600 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center text-lg">
                  -{product.discount}%
                </div>
              )}
            </motion.div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ${
                    selectedImage === index 
                      ? 'ring-2 ring-accent-500 ring-offset-2' 
                      : 'ring-1 ring-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Collection Badge */}
              <div className="mb-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded">
                  {product.collection || 'New Collection'}
                </span>
              </div>
              
              {/* Title & Subtitle */}
              <h1 className="text-4xl font-heading font-bold text-primary-900 mb-1">{product.name}</h1>
              <p className="text-neutral-600 mb-4">Premium quality design for everyday life</p>
              
              {/* Price */}
              <div className="flex items-center mb-6">
                {product.discount > 0 ? (
                  <>
                    <span className="text-3xl font-medium text-primary-900 mr-3">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-xl text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-medium text-primary-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-8">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={18}
                      className={`${i < Math.floor(product.rating) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium text-neutral-700">{product.rating}</span>
                <span className="mx-2 text-neutral-400">•</span>
                <Link to="#reviews" className="text-accent-600 hover:text-accent-700">
                  {product.reviewCount} reviews
                </Link>
              </div>
              
              {/* Description */}
              <div className="prose prose-neutral max-w-none mb-8">
                <p>{product.description}</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-neutral-200 my-8"></div>
              
              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-3">Color: <span className="text-accent-600 capitalize">{selectedColor}</span></h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => {
                      // Map color names to actual CSS colors for visualization
                      const colorMap = {
                        black: '#000',
                        white: '#fff',
                        red: '#ef4444',
                        blue: '#3b82f6',
                        green: '#10b981',
                        yellow: '#f59e0b',
                        purple: '#8b5cf6',
                        gray: '#6b7280',
                      }
                      
                      const bgColor = colorMap[color.toLowerCase()] || '#000'
                      
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedColor === color
                              ? 'ring-2 ring-accent-500 ring-offset-2'
                              : 'ring-1 ring-neutral-300'
                          }`}
                          aria-label={`Select ${color} color`}
                        >
                          <span 
                            className="w-9 h-9 rounded-full"
                            style={{ backgroundColor: bgColor }}
                          ></span>
                          {selectedColor === color && (
                            <span className="absolute text-white">
                              <FiCheck />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-medium">Size: <span className="text-accent-600">{selectedSize}</span></h3>
                    <button className="text-sm text-accent-600 hover:text-accent-700 underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 min-w-[48px] px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary-900 text-white shadow-md'
                            : 'bg-white border border-neutral-300 text-primary-900 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    className="w-12 h-14 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus size={18} />
                  </button>
                  <div className="w-14 h-14 flex items-center justify-center border-x border-neutral-300 font-medium">
                    {quantity}
                  </div>
                  <button 
                    onClick={incrementQuantity}
                    className="w-12 h-14 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={18} />
                  </button>
                </div>
                
                <motion.button 
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  className="flex-grow bg-primary-900 hover:bg-primary-950 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <FiShoppingBag className="mr-2" size={18} />
                  Add to Cart
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded-lg text-primary-900 transition-colors"
                >
                  <FiHeart size={20} />
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded-lg text-primary-900 transition-colors"
                >
                  <FiShare2 size={20} />
                </motion.button>
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <FiTruck className="text-accent-600 mr-3" size={22} />
                  <span className="text-sm font-medium">{product.freeShipping ? 'Free Shipping' : 'Fast Delivery'}</span>
                </div>
                <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <FiShield className="text-accent-600 mr-3" size={22} />
                  <span className="text-sm font-medium">2 Year Warranty</span>
                </div>
                <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                  <FiRepeat className="text-accent-600 mr-3" size={22} />
                  <span className="text-sm font-medium">30-Day Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Product Info Tabs */}
        <div className="mt-16 border-t border-neutral-200">
          <div className="flex overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'description' 
                  ? 'text-accent-600 border-b-2 border-accent-600' 
                  : 'text-neutral-600 hover:text-primary-800'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'details' 
                  ? 'text-accent-600 border-b-2 border-accent-600' 
                  : 'text-neutral-600 hover:text-primary-800'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-6 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'shipping' 
                  ? 'text-accent-600 border-b-2 border-accent-600' 
                  : 'text-neutral-600 hover:text-primary-800'
              }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-accent-600 border-b-2 border-accent-600' 
                  : 'text-neutral-600 hover:text-primary-800'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>
          
          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="prose prose-lg max-w-none"
                >
                  <p>{product.description}</p>
                  <p>Our products are crafted with the finest materials and attention to detail, ensuring longevity and comfort. Each piece undergoes rigorous quality control to meet our high standards.</p>
                  <h3>Features</h3>
                  <ul>
                    <li>Premium quality materials</li>
                    <li>Ergonomic design for comfort</li>
                    <li>Versatile use for multiple occasions</li>
                    <li>Timeless aesthetic that never goes out of style</li>
                  </ul>
                </motion.div>
              )}
              
              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Product Specifications</h3>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-neutral-200">
                            <td className="py-3 text-neutral-600">Material</td>
                            <td className="py-3 font-medium">Premium Quality</td>
                          </tr>
                          <tr className="border-b border-neutral-200">
                            <td className="py-3 text-neutral-600">Dimensions</td>
                            <td className="py-3 font-medium">H: 10cm x W: 15cm x D: 5cm</td>
                          </tr>
                          <tr className="border-b border-neutral-200">
                            <td className="py-3 text-neutral-600">Weight</td>
                            <td className="py-3 font-medium">0.5 kg</td>
                          </tr>
                          <tr className="border-b border-neutral-200">
                            <td className="py-3 text-neutral-600">Care</td>
                            <td className="py-3 font-medium">Dry clean only</td>
                          </tr>
                          <tr className="border-b border-neutral-200">
                            <td className="py-3 text-neutral-600">Origin</td>
                            <td className="py-3 font-medium">Designed in USA, Made in Italy</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FiCheck className="text-green-600" size={14} />
                          </span>
                          <span>Main product</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FiCheck className="text-green-600" size={14} />
                          </span>
                          <span>User manual</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FiCheck className="text-green-600" size={14} />
                          </span>
                          <span>2-year warranty card</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FiCheck className="text-green-600" size={14} />
                          </span>
                          <span>Gift box packaging</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-medium mb-3">Shipping Information</h3>
                    <p className="text-neutral-600 mb-4">We ship worldwide with premium carriers to ensure your order arrives safely and on time.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Standard Shipping</h4>
                        <p className="text-neutral-600 text-sm">3-5 business days</p>
                        <p className="font-medium mt-2">{product.freeShipping ? 'Free' : '$4.99'}</p>
                      </div>
                      
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Express Shipping</h4>
                        <p className="text-neutral-600 text-sm">1-2 business days</p>
                        <p className="font-medium mt-2">$12.99</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Return Policy</h3>
                    <p className="text-neutral-600 mb-4">We want you to be completely satisfied with your purchase.</p>
                    
                    <ul className="space-y-3">
                      <li className="flex">
                        <FiCheck className="text-accent-600 mt-1 mr-2 flex-shrink-0" />
                        <span>30-day return window for all unused and unopened products</span>
                      </li>
                      <li className="flex">
                        <FiCheck className="text-accent-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Free returns for all orders within the continental US</span>
                      </li>
                      <li className="flex">
                        <FiCheck className="text-accent-600 mt-1 mr-2 flex-shrink-0" />
                        <span>International returns may be subject to shipping fees</span>
                      </li>
                      <li className="flex">
                        <FiCheck className="text-accent-600 mt-1 mr-2 flex-shrink-0" />
                        <span>Contact our customer service for return authorization</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  id="reviews"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <div className="bg-neutral-50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-primary-900 mb-2">Customer Reviews</h3>
                        <div className="flex items-center mb-4">
                          <div className="flex mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <FiStar 
                                key={i} 
                                size={20}
                                className={`${i < Math.floor(product.rating) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-2xl font-bold">{product.rating}</span>
                        </div>
                        <p className="text-neutral-600 mb-6">Based on {product.reviewCount} reviews</p>
                        
                        {/* Rating distribution */}
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map(star => {
                            const percentage = star === 5 ? 65 : 
                                              star === 4 ? 20 : 
                                              star === 3 ? 10 : 
                                              star === 2 ? 4 : 1;
                            
                            return (
                              <div key={star} className="flex items-center">
                                <span className="w-6 text-sm text-neutral-600">{star}</span>
                                <div className="w-full bg-neutral-200 rounded-full h-2 mx-2">
                                  <div className="bg-accent-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <span className="w-8 text-sm text-neutral-600">{percentage}%</span>
                              </div>
                            )
                          })}
                        </div>
                        
                        <button className="w-full mt-6 bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                          Write a Review
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      {/* Sample reviews */}
                      {[
                        {
                          name: "Alex Johnson",
                          rating: 5,
                          date: "2 months ago",
                          comment: "This is exactly what I was looking for! The quality exceeds my expectations and delivery was super fast. I highly recommend this product to anyone who's considering purchasing it. The attention to detail is remarkable."
                        },
                        {
                          name: "Sarah Miller",
                          rating: 4,
                          date: "3 weeks ago",
                          comment: "Great product overall! The only reason for 4 stars instead of 5 is that the color is slightly different from what I expected. Otherwise, construction is excellent and it feels very premium."
                        },
                        {
                          name: "Michael Chen",
                          rating: 5,
                          date: "1 month ago",
                          comment: "Absolutely love this! It's my second purchase from this brand and they never disappoint. The design is elegant and functional at the same time. Will definitely be buying more items in the future."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-neutral-200 pb-6 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-lg">{review.name}</h4>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <FiStar 
                                      key={i} 
                                      size={16}
                                      className={`${i < review.rating ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-neutral-500">{review.date}</span>
                              </div>
                            </div>
                            <button className="text-neutral-500 text-sm hover:text-accent-600">
                              Report
                            </button>
                          </div>
                          <p className="text-neutral-700">{review.comment}</p>
                          <div className="mt-3 flex items-center">
                            <button className="text-sm text-accent-600 hover:text-accent-800 font-medium">Helpful</button>
                            <span className="mx-2 text-neutral-300">•</span>
                            <button className="text-sm text-neutral-500 hover:text-neutral-700">Reply</button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Pagination */}
                      <div className="flex justify-between items-center pt-4">
                        <button className="flex items-center text-neutral-500 hover:text-primary-900">
                          <FiChevronRight className="mr-1 rotate-180" />
                          Previous
                        </button>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map(page => (
                            <button
                              key={page}
                              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                page === 1 
                                  ? 'bg-primary-900 text-white' 
                                  : 'text-neutral-600 hover:bg-neutral-100'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                        <button className="flex items-center text-neutral-500 hover:text-primary-900">
                          Next
                          <FiChevronRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="mt-16 mb-20">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(item => (
              <motion.div 
                key={item}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-square mb-3 relative">
                  <img 
                    src={product.image} 
                    alt="Related product" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <FiShoppingBag size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium mb-1">Similar Product {item}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary-900">{formatPrice(discountedPrice)}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={14}
                        className={`${i < 4 ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Recently Viewed */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(item => (
              <motion.div 
                key={item}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-square mb-3 relative">
                  <img 
                    src={`https://picsum.photos/400/400?random=${item}`} 
                    alt="Recently viewed product" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <FiShoppingBag size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium mb-1">Viewed Product {item}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-primary-900">{formatPrice(Math.random() * 100 + 50)}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar 
                        key={i} 
                        size={14}
                        className={`${i < Math.floor(Math.random() * 5 + 1) ? 'text-accent-500 fill-accent-500' : 'text-neutral-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-primary-900 rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Join Our Newsletter</h2>
              <p className="text-primary-100 mb-0">Get 10% off your first order and stay updated with new collections and exclusive offers.</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-white bg-opacity-15 text-white placeholder-primary-200 border border-primary-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <button className="whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails