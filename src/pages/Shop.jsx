import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiX, FiChevronDown, FiRefreshCw } from 'react-icons/fi'
import ProductCard from '../components/products/ProductCard'
import { categories } from '../data/mockData'
import { filterByCategory, sortProducts, searchProducts } from '../utils/helpers'
import authService from '../components/Service/authService'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [sortBy, setSortBy] = useState('newest')
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  
  // Filter section collapse states
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    price: false,
    colors: false,
    sizes: false
  })
  
  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Fetch products from the API - no auth required for this endpoint
        const response = await fetch('http://localhost:3000/api/getAllProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('Products fetched:', data)
        
        // Transform the data to match the expected format if necessary
        const formattedProducts = data.map(product => ({
          ...product,
          _id: product._id,
          name: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          // Convert server image path to full URL
          image: `http://localhost:3000/image/${product.image}`,
          colors: product.colors || [],
          sizes: product.sizes || []
        }))
        
        setProducts(formattedProducts)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        
        // Handle authentication errors specially
        if (err.message && (
            err.message.includes('authentication') || 
            err.message.includes('token') ||
            err.message.includes('session') ||
            err.message.includes('unauthorized')
        )) {
          // Clear the invalid token
          authService.logout()
          setError("Your session has expired. Please log in again.")
          
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate('/login', { state: { from: '/shop' } })
          }, 3000)
        } else {
          setError(err.message || 'Failed to fetch products')
        }
        
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  // Get all available colors and sizes from products
  const allColors = [...new Set(products.flatMap(product => 
    product.colors ? product.colors : []
  ))]
  
  const allSizes = [...new Set(products.flatMap(product => 
    product.sizes ? product.sizes : []
  ).filter(Boolean))]
  
  // Handle search query from URL and apply filters
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''
    let result = [...products]
    
    // Apply search filter first (if present)
    if (searchQuery) {
      result = searchProducts(result, searchQuery)
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = filterByCategory(result, selectedCategory)
    }
    
    // Apply price range filter
    result = result.filter(product => {
      const price = product.price || 0
      const discount = product.discount || 0
      const discountedPrice = discount 
        ? price * (1 - discount / 100) 
        : price
      
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1]
    })
    
    // Apply color filter
    if (selectedColors.length > 0 && allColors.length > 0) {
      result = result.filter(product => 
        product.colors && product.colors.some(color => selectedColors.includes(color))
      )
    }
    
    // Apply size filter
    if (selectedSizes.length > 0 && allSizes.length > 0) {
      result = result.filter(product => 
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      )
    }
    
    // Apply sorting
    result = sortProducts(result, sortBy)
    
    console.log('Filtered products:', result)
    setFilteredProducts(result)
  }, [searchParams, products, selectedCategory, priceRange, sortBy, selectedColors, selectedSizes])
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }
  
  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
  }
  
  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }
  
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }
  
  const resetFilters = () => {
    setSelectedCategory('')
    setPriceRange([0, 100000])
    setSortBy('newest')
    setSelectedColors([])
    setSelectedSizes([])
  }
  
  // Handle login action directly from shop page
  const handleLogin = () => {
    navigate('/login', { state: { from: '/shop' } })
  }

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory) count++
    if (priceRange[0] > 0 || priceRange[1] < 100000) count++
    if (selectedColors.length > 0) count++
    if (selectedSizes.length > 0) count++
    return count
  }

  // Display loading state
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-800"></div>
      </div>
    )
  }

  // Display error state
  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😓</div>
          <h3 className="text-xl font-medium mb-2">Error loading products</h3>
          <p className="text-red-600 mb-6">{error}</p>
          {error.includes('log in') || error.includes('session has expired') ? (
            <button
              onClick={handleLogin}
              className="btn-primary"
            >
              Go to Login
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }
  
  // Filter Section Component
  const FilterSection = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'divide-y divide-gray-100' : 'space-y-6'}`}>
      {/* Filter Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FiFilter className="w-5 h-5 text-primary-600" />
            Filters
          </h3>
          {getActiveFiltersCount() > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        <button 
          onClick={resetFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 group"
        >
          <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          Reset
        </button>
      </div>
      
      {/* Categories */}
      <div className={`${isMobile ? 'py-4' : 'bg-white rounded-xl shadow-sm border border-gray-100 p-5'}`}>
        <button
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full mb-4 text-left"
        >
          <h4 className="font-semibold text-gray-900">Categories</h4>
          <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            collapsedSections.categories ? '-rotate-180' : ''
          }`} />
        </button>
        
        <motion.div
          initial={false}
          animate={{
            height: collapsedSections.categories ? 0 : 'auto',
            opacity: collapsedSections.categories ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3">
            {categories.map(category => (
              <label 
                key={category.id} 
                className="flex items-center group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 transition-all duration-200"
                    checked={selectedCategory === category.slug}
                    onChange={() => handleCategoryChange(category.slug)}
                  />
                  {selectedCategory === category.slug && (
                    <div className="absolute inset-0 w-4 h-4 bg-primary-600 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Price Range */}
      <div className={`${isMobile ? 'py-4' : 'bg-white rounded-xl shadow-sm border border-gray-100 p-5'}`}>
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full mb-4 text-left"
        >
          <h4 className="font-semibold text-gray-900">Price Range</h4>
          <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            collapsedSections.price ? '-rotate-180' : ''
          }`} />
        </button>
        
        <motion.div
          initial={false}
          animate={{
            height: collapsedSections.price ? 0 : 'auto',
            opacity: collapsedSections.price ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-2">
            <div className="relative mb-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(priceRange[0]/500)*100}%, #6366f1 ${(priceRange[0]/500)*100}%, #6366f1 ${(priceRange[1]/500)*100}%, #e5e7eb ${(priceRange[1]/500)*100}%, #e5e7eb 100%)`
                }}
              />
              <div className="absolute -top-8 left-0 bg-gray-900 text-white text-xs rounded px-2 py-1">
                ${priceRange[0]}
              </div>
              <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs rounded px-2 py-1">
                ${priceRange[1]}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">${priceRange[0]}</span>
              <span className="text-gray-400">-</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">${priceRange[1]}</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Colors */}
      {allColors.length > 0 && (
        <div className={`${isMobile ? 'py-4' : 'bg-white rounded-xl shadow-sm border border-gray-100 p-5'}`}>
          <button
            onClick={() => toggleSection('colors')}
            className="flex justify-between items-center w-full mb-4 text-left"
          >
            <h4 className="font-semibold text-gray-900">Colors</h4>
            <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              collapsedSections.colors ? '-rotate-180' : ''
            }`} />
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: collapsedSections.colors ? 0 : 'auto',
              opacity: collapsedSections.colors ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {allColors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                    selectedColors.includes(color)
                      ? 'bg-primary-600 text-white shadow-lg ring-2 ring-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Sizes */}
      {allSizes.length > 0 && (
        <div className={`${isMobile ? 'py-4' : 'bg-white rounded-xl shadow-sm border border-gray-100 p-5'}`}>
          <button
            onClick={() => toggleSection('sizes')}
            className="flex justify-between items-center w-full mb-4 text-left"
          >
            <h4 className="font-semibold text-gray-900">Sizes</h4>
            <FiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              collapsedSections.sizes ? '-rotate-180' : ''
            }`} />
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: collapsedSections.sizes ? 0 : 'auto',
              opacity: collapsedSections.sizes ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-4 gap-2">
              {allSizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`h-12 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    selectedSizes.includes(size)
                      ? 'bg-primary-600 text-white shadow-lg ring-2 ring-primary-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 py-20 text-white">
        <div className="container text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Shop Collection</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Discover our curated collection of luxury items designed to elevate your style
          </p>
        </div>
      </section>
      
      {/* Shop Section */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container-fluid  lg:px-8">
          <div className="flex flex-col px-24  lg:flex-row gap-8">
            {/* Filter - Desktop */}
            <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSection />
              </div>
            </aside>
            
            {/* Products */}
            <div className="flex-grow">
              {/* Sort & Filter Buttons */}
              <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium">Showing</span>
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {filteredProducts.length}
                  </span>
                  <span>products</span>
                </div>
                
                <div className="flex gap-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    >
                      <option value="newest">Newest First</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="name-a-z">Name: A to Z</option>
                      <option value="name-z-a">Name: Z to A</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  
                  {/* Mobile Filter Button */}
                  <button
                    onClick={toggleFilter}
                    className="lg:hidden flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <FiFilter className="h-4 w-4" />
                    <span>Filters</span>
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-white text-primary-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">No products found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleFilter}
      ></div>
      
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white z-50 transition-transform duration-300 transform lg:hidden rounded-t-2xl shadow-2xl ${
          isFilterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="p-6">
          {/* Mobile Filter Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
            <button 
              onClick={toggleFilter} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <FiX className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <FilterSection isMobile={true} />
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={resetFilters}
              className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl text-gray-700 text-center font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Reset All
            </button>
            <button
              onClick={toggleFilter}
              className="flex-1 py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-center font-medium transition-all duration-200 shadow-lg"
            >
              Show {filteredProducts.length} Products
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop