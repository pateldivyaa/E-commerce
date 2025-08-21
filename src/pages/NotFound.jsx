import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, 
  FiShoppingBag, 
  FiArrowLeft, 
  FiSearch,
  FiStar,
  FiHeart,
  FiTrendingUp,
  FiGift,
  FiZap
} from 'react-icons/fi'
import { useState, useEffect } from 'react'

const NotFound = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const suggestions = [
    { icon: FiTrendingUp, title: "Trending Products", path: "/shop?category=trending", color: "from-red-500 to-pink-600" },
    { icon: FiStar, title: "Best Sellers", path: "/shop?category=best-sellers", color: "from-yellow-500 to-orange-600" },
    { icon: FiGift, title: "New Arrivals", path: "/shop?category=new-arrivals", color: "from-green-500 to-emerald-600" },
    { icon: FiHeart, title: "Popular Items", path: "/shop?category=popular", color: "from-purple-500 to-indigo-600" }
  ]

  const floatingElements = [
    { id: 1, size: 'w-3 h-3', delay: 0, duration: 3 },
    { id: 2, size: 'w-2 h-2', delay: 1, duration: 4 },
    { id: 3, size: 'w-4 h-4', delay: 2, duration: 2.5 },
    { id: 4, size: 'w-2.5 h-2.5', delay: 0.5, duration: 3.5 },
    { id: 5, size: 'w-3.5 h-3.5', delay: 1.5, duration: 3 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [suggestions.length])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const numberVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut", type: "spring", bounce: 0.3 }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-purple-600/20 rounded-full blur-3xl"
        />
        
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${element.size} bg-gradient-to-br from-primary-400 to-purple-600 rounded-full opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-primary-500/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* 404 Number with enhanced styling */}
          <motion.div
            variants={numberVariants}
            className="relative mb-8"
          >
            <motion.h1 
              className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none relative"
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #f59e0b, #ef4444)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              404
            </motion.h1>
            
            {/* Glow effect behind number */}
            <motion.div
              className="absolute inset-0 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none text-primary-500/20 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Decorative line with animation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-8"
          >
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '12rem' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.div
              className="mx-4 w-3 h-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '12rem' }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </motion.div>

          {/* Title and Description */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 text-slate-800 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Oops! Page Not Found
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              The page you're looking for seems to have wandered off into the digital wilderness. 
              But don't worry - we'll help you find your way back to luxury!
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] justify-center"
              >
                <FiHome className="w-5 h-5 mr-3 group-hover:-translate-y-0.5 transition-transform" />
                Back to Home
                <motion.div
                  className="ml-2 w-0 group-hover:w-2 h-0.5 bg-white/50 transition-all duration-300"
                />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shop" 
                className="group inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-slate-700 dark:text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-secondary-600 transition-all duration-300 min-w-[200px] justify-center"
              >
                <FiShoppingBag className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                Continue Shopping
                <motion.div
                  className="ml-2 w-0 group-hover:w-2 h-0.5 bg-primary-500 transition-all duration-300"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Suggestions Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/60 dark:bg-secondary-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-secondary-700/50 shadow-xl"
          >
            <motion.h3 
              className="text-2xl font-serif font-semibold text-slate-800 dark:text-white mb-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <FiZap className="w-6 h-6 mr-3 text-yellow-500" />
              Popular Destinations
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={suggestion.path}
                    className="group block p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-secondary-700 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${suggestion.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <suggestion.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {suggestion.title}
                    </h4>
                    <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Search suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mt-8 pt-8 border-t border-gray-200 dark:border-secondary-700"
            >
              <p className="text-slate-600 dark:text-gray-300 mb-4">
                Looking for something specific? Try searching:
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative max-w-md mx-auto"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-secondary-700 border border-gray-200 dark:border-secondary-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Back link */}
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center text-slate-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
            >
              <FiArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="relative">
                Go back to previous page
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 via-yellow-500 to-primary-500 bg-size-200"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 via-yellow-500 to-primary-500"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}

export default NotFound