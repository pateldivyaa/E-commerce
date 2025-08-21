import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiUser, FiHeart, FiMenu, FiX, FiSun, FiMoon, FiSearch, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { useTheme } from '../../hooks/useTheme'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)
  const [prevCartCount, setPrevCartCount] = useState(0)
  const [shopDropdown, setShopDropdown] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const { cartItemsCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  const navigation = [
    { name: 'Home', path: '/' },
    { 
      name: 'Shop', 
      path: '/shop',
      hasDropdown: true,
      dropdown: [
        { name: 'All Products', path: '/shop' },
        { name: 'New Arrivals', path: '/shop?category=new-arrivals' },
        { name: 'Best Sellers', path: '/shop?category=best-sellers' },
        { name: 'On Sale', path: '/shop?category=sale' },
      ]
    },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
  ]

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false)
    setShopDropdown(false)
  }, [location])

  // Handle scroll events for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate cart when count changes
  useEffect(() => {
    if (cartItemsCount > prevCartCount && prevCartCount >= 0) {
      setCartBounce(true)
      const timer = setTimeout(() => setCartBounce(false), 600)
      return () => clearTimeout(timer)
    }
    setPrevCartCount(cartItemsCount)
  }, [cartItemsCount, prevCartCount])

  const headerVariants = {
    scrolled: {
      backgroundColor: theme === 'dark' 
        ? 'rgba(30, 41, 59, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid',
      borderColor: theme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      boxShadow: theme === 'dark' 
        ? '0 4px 25px rgba(0, 0, 0, 0.3)' 
        : '0 4px 25px rgba(0, 0, 0, 0.08)',
    },
    top: {
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      borderBottom: '1px solid transparent',
      boxShadow: 'none',
    }
  }

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom"
        >
          ✨ Free shipping on orders over $100 | Use code: FREESHIP ✨
        </motion.div>
      </div>

      <motion.header 
        variants={headerVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sticky top-0 w-full z-50"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="group relative"
              >
                <div className="font-serif text-xl md:text-2xl font-bold">
                  <span className="bg-gradient-to-r from-secondary-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Luxury
                  </span>
                  <span className="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                    Commerce
                  </span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </motion.div>

            {/* Desktop Navigation with enhanced styling */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setShopDropdown(true)}
                      onMouseLeave={() => setShopDropdown(false)}
                    >
                      <button className="flex items-center space-x-1 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 text-secondary-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-secondary-700/50">
                        <span>{item.name}</span>
                        <FiChevronDown className="w-4 h-4 transition-transform duration-200 gFroup-hover:rotate-180" />
                      </button>
                      
                      <AnimatePresence>
                        {shopDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-gray-100 dark:border-secondary-700 overflow-hidden"
                          >
                            {item.dropdown.map((dropItem, index) => (
                              <motion.div
                                key={dropItem.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={dropItem.path}
                                  className="block px-4 py-3 text-sm text-secondary-600 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-all duration-200"
                                >
                                  {dropItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                          isActive 
                            ? 'text-primary-500 bg-primary-50 dark:bg-secondary-700/50' 
                            : 'text-secondary-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-secondary-700/50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.name}
                          {isActive && (
                            <motion.div
                              layoutId="activeNav"
                              className="absolute inset-0 bg-primary-100 dark:bg-secondary-700 rounded-full -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions with enhanced styling */}
           <div className="flex items-center space-x-3">
  {/* Search Button - Enhanced */}
  <motion.button 
    whileHover={{ 
      scale: 1.15,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.85 }}
    onClick={() => setSearchOpen(true)}
    className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50 
               hover:from-primary-50 hover:to-purple-100 
               dark:from-secondary-800 dark:to-secondary-700 
               dark:hover:from-purple-900/30 dark:hover:to-primary-900/30
               shadow-lg hover:shadow-xl 
               border border-gray-200/50 dark:border-secondary-600/50
               hover:border-primary-300/50 dark:hover:border-purple-500/30
               transition-all duration-500 ease-out group
               backdrop-blur-sm"
    aria-label="Search"
  >
    <FiSearch className="w-5 h-5 text-secondary-700 dark:text-gray-300 
                         group-hover:text-primary-600 dark:group-hover:text-purple-400 
                         transition-all duration-300 group-hover:drop-shadow-sm" />
    
    {/* Animated glow effect */}
    <motion.div 
      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400/20 to-purple-600/20 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      whileHover={{ scale: 1.1 }}
    />
    
    {/* Pulse ring on hover */}
    <motion.div
      className="absolute inset-0 rounded-2xl border-2 border-primary-400/30 
                 opacity-0 group-hover:opacity-100 scale-110"
      animate={{ scale: [1.1, 1.2, 1.1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.button>

  {/* Theme Toggle - Enhanced */}
  <motion.button 
    whileHover={{ 
      scale: 1.15,
      rotate: theme === 'dark' ? 180 : -180,
      transition: { duration: 0.4, ease: "easeInOut" }
    }}
    whileTap={{ scale: 0.85 }}
    onClick={toggleTheme} 
    className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50
               hover:from-yellow-50 hover:to-orange-100 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30
               dark:from-secondary-800 dark:to-secondary-700
               shadow-lg hover:shadow-xl 
               border border-gray-200/50 dark:border-secondary-600/50
               hover:border-yellow-300/50 dark:hover:border-blue-500/30
               transition-all duration-500 ease-out group
               backdrop-blur-sm overflow-hidden"
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <AnimatePresence mode="wait">
      {theme === 'dark' ? (
        <motion.div
          key="sun"
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <FiSun className="w-5 h-5 text-yellow-600 group-hover:text-yellow-500 
                           transition-colors duration-300 drop-shadow-sm" />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <FiMoon className="w-5 h-5 text-secondary-700 group-hover:text-indigo-600 
                           dark:text-gray-300 dark:group-hover:text-blue-400
                           transition-colors duration-300 drop-shadow-sm" />
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Animated background particles */}
    <motion.div 
      className="absolute inset-0 rounded-2xl"
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
          : 'radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)'
      }}
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.button>

  {/* Wishlist - Enhanced */}
  <motion.div
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.85 }}
    className="hidden sm:block"
  >
    <Link 
      to="/wishlist" 
      className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50
                 hover:from-red-50 hover:to-pink-100 
                 dark:from-secondary-800 dark:to-secondary-700
                 dark:hover:from-red-900/30 dark:hover:to-pink-900/30
                 shadow-lg hover:shadow-xl 
                 border border-gray-200/50 dark:border-secondary-600/50
                 hover:border-red-300/50 dark:hover:border-pink-500/30
                 transition-all duration-500 ease-out group
                 backdrop-blur-sm block"
      aria-label="Wishlist"
    >
      <motion.div
        whileHover={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <FiHeart className="w-5 h-5 text-secondary-700 dark:text-gray-300 
                           group-hover:text-red-500 dark:group-hover:text-pink-400
                           transition-colors duration-300 group-hover:drop-shadow-sm" />
      </motion.div>
      
      {/* Heart beat effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/10 to-pink-600/10"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </Link>
  </motion.div>

  {/* Cart - Enhanced */}
  <motion.div
    whileHover={{ 
      scale: 1.1,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.9 }}
  >
    <Link 
      to="/cart" 
      className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50
                 hover:from-green-50 hover:to-emerald-100 
                 dark:from-secondary-800 dark:to-secondary-700
                 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30
                 shadow-lg hover:shadow-xl 
                 border border-gray-200/50 dark:border-secondary-600/50
                 hover:border-green-300/50 dark:hover:border-emerald-500/30
                 transition-all duration-500 ease-out group
                 backdrop-blur-sm block"
      aria-label="Cart"
    >
      <motion.div
        animate={cartBounce ? { 
          scale: [1, 1.4, 1],
          rotate: [0, -20, 20, 0]
        } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <FiShoppingBag className="w-5 h-5 text-secondary-700 dark:text-gray-300 
                                 group-hover:text-green-600 dark:group-hover:text-emerald-400
                                 transition-colors duration-300 group-hover:drop-shadow-sm" />
      </motion.div>
      
      {/* Cart Count Badge - Enhanced */}
      {cartItemsCount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 min-w-[24px] h-6 px-1.5
                     bg-gradient-to-r from-green-500 to-emerald-600 
                     text-white text-xs font-bold 
                     flex items-center justify-center rounded-xl
                     shadow-lg border-2 border-white dark:border-secondary-800
                     backdrop-blur-sm"
        >
          <motion.span
            key={cartItemsCount}
            initial={{ scale: 1.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            {cartItemsCount}
          </motion.span>
          
          {/* Pulse ring around badge */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-green-400 opacity-50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
      
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/10 to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
        }}
        animate={{
          x: [-100, 100],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </Link>
  </motion.div>

  {/* Account - Enhanced */}
  <motion.div
    whileHover={{ 
      scale: 1.15,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.85 }}
    className="hidden sm:block"
  >
    <Link 
      to={isAuthenticated ? "/dashboard" : "/login"} 
      className="relative p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50
                 hover:from-blue-50 hover:to-indigo-100 
                 dark:from-secondary-800 dark:to-secondary-700
                 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30
                 shadow-lg hover:shadow-xl 
                 border border-gray-200/50 dark:border-secondary-600/50
                 hover:border-blue-300/50 dark:hover:border-indigo-500/30
                 transition-all duration-500 ease-out group
                 backdrop-blur-sm block"
      aria-label={isAuthenticated ? "Account" : "Login"}
    >
      <FiUser className="w-5 h-5 text-secondary-700 dark:text-gray-300 
                         group-hover:text-blue-600 dark:group-hover:text-indigo-400
                         transition-colors duration-300 group-hover:drop-shadow-sm" />
      
      {/* Online Status Indicator - Enhanced */}
      {isAuthenticated && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 
                     rounded-full border-2 border-white dark:border-secondary-800
                     shadow-lg"
        >
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      )}
    </Link>
  </motion.div>

  {/* Mobile Menu Button - Enhanced */}
  <motion.button
    whileHover={{ 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.4, ease: "easeInOut" }
    }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="lg:hidden p-3 rounded-2xl bg-gradient-to-br from-white to-gray-50
               hover:from-primary-50 hover:to-purple-100 
               dark:from-secondary-800 dark:to-secondary-700
               dark:hover:from-purple-900/30 dark:hover:to-primary-900/30
               shadow-lg hover:shadow-xl 
               border border-gray-200/50 dark:border-secondary-600/50
               hover:border-primary-300/50 dark:hover:border-purple-500/30
               transition-all duration-500 ease-out group
               backdrop-blur-sm"
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  >
    <AnimatePresence mode="wait">
      {isMenuOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FiX className="w-6 h-6 text-secondary-700 dark:text-gray-300 
                         group-hover:text-primary-600 dark:group-hover:text-purple-400
                         transition-colors duration-300" />
        </motion.div>
      ) : (
        <motion.div
          key="menu"
          initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <FiMenu className="w-6 h-6 text-secondary-700 dark:text-gray-300 
                           group-hover:text-primary-600 dark:group-hover:text-purple-400
                           transition-colors duration-300" />
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Animated border */}
    <motion.div
      className="absolute inset-0 rounded-2xl border-2 border-primary-400/30 opacity-0 group-hover:opacity-100"
      animate={isMenuOpen ? { 
        scale: [1, 1.05, 1],
        opacity: [0.5, 1, 0.5]
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.button>
</div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed top-[112px] left-0 right-0 z-40 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-xl border-t border-gray-100 dark:border-secondary-700 shadow-xl"
          >
            <motion.div 
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="container-custom py-6"
            >
              <nav className="flex flex-col space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <div className="font-medium text-lg text-secondary-800 dark:text-white px-4 py-3">
                          {item.name}
                        </div>
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            className="block pl-8 pr-4 py-2 text-secondary-600 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-secondary-700 rounded-lg transition-all duration-200"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          `block px-4 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
                            isActive 
                              ? 'text-primary-500 bg-primary-50 dark:bg-secondary-700' 
                              : 'text-secondary-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-secondary-700'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-secondary-700 to-transparent my-4"></div>
                
                <div className="flex items-center space-x-4 px-4 py-2">
                  <Link 
                    to={isAuthenticated ? "/dashboard" : "/login"}
                    className="flex items-center space-x-3 text-secondary-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  >
                    <FiUser className="w-5 h-5" />
                    <span className="font-medium">{isAuthenticated ? "My Account" : "Login / Register"}</span>
                  </Link>
                </div>
                
                <div className="flex items-center space-x-4 px-4 py-2">
                  <Link 
                    to="/cart"
                    className="flex items-center space-x-3 text-secondary-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  >
                    <FiShoppingBag className="w-5 h-5" />
                    <span className="font-medium">Cart ({cartItemsCount})</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-2xl mx-4 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-secondary-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-12 pr-12 py-6 text-lg border-none outline-none bg-transparent text-secondary-800 dark:text-white placeholder-gray-400"
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-secondary-700"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Search suggestions could go here */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-secondary-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Popular searches: Sneakers, Dresses, Electronics, Beauty
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header