import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { featuredProducts, categories } from '../data/mockData'

const Home = () => {
  return (
    <div className="bg-neutral-50">
      {/* Hero Section - Ultra-modern layered design */}
      <section className="relative h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -inset-[100px] opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.8), rgba(30, 64, 175, 0.4), rgba(15, 23, 42, 0))',
              backgroundSize: '150% 150%'
            }}
          />
        </div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-2xl"
            animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 left-[15%] w-80 h-80 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-pink-500/20 blur-2xl"
            animate={{ y: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Grid patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
    
        {/* Content area with 3D perspective */}
        <div className="relative h-full container flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.span 
                  className="inline-block py-1.5 px-4 rounded-full font-medium text-sm bg-gradient-to-r from-fuchsia-500 to-purple-600 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  LUXURY REDEFINED • SS 2025
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  <span className="block">The Art of</span>
                  <motion.span
                    className="inline-block"
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 via-purple-400 to-indigo-400">
                      Elegance
                    </span>
                  </motion.span>
                </h1>
                <p className="text-xl leading-relaxed mb-10 text-indigo-100 max-w-lg">
                  Discover a curated collection of design masterpieces that transcend the ordinary and redefine luxury fashion.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link to="/shop" className="group relative overflow-hidden rounded-lg px-8 py-4 flex items-center justify-center">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-fuchsia-600 to-purple-700 opacity-90 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute inset-0 w-full h-full bg-[length:4px_4px] bg-grid-white/[0.2] group-hover:bg-[length:5px_5px] transition-all duration-500"></span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:animate-[shimmer_2s_infinite]"></span>
                  <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:animate-[shimmer_2s_infinite]"></span>
                  <span className="relative text-white text-lg font-medium z-10 flex items-center">
                    Explore Collection
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FiArrowRight />
                    </motion.span>
                  </span>
                </Link>
                <Link to="/new-arrivals" className="relative overflow-hidden rounded-lg px-8 py-4 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all">
                  <span className="text-white text-lg">New Season</span>
                </Link>
              </motion.div>
              
              {/* Featured brands logos */}
              <motion.div 
                className="mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <p className="text-indigo-200 mb-4 text-sm uppercase tracking-wide">Featured in</p>
                <div className="flex space-x-6 items-center">
                  {['Vogue', 'GQ', 'Elle', 'Harper\'s'].map((brand, i) => (
                    <div key={brand} className="text-white/60 hover:text-white/90 transition-colors text-xl font-serif italic">
                      {brand}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side - 3D product display */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative w-full aspect-[4/5]">
                {/* Main image with 3D effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.03, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <img 
                    src="https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="Luxury Fashion" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent"></div>
                </motion.div>
                
                {/* Floating product info card */}
                <motion.div 
                  className="absolute -right-12 bottom-32 bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/20 w-64"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <div className="text-white">
                    <div className="font-medium mb-1">Premium Collection</div>
                    <div className="text-xs text-indigo-200">Handcrafted with premium materials</div>
                    <div className="mt-2 font-semibold text-lg">$399.00</div>
                  </div>
                </motion.div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute -left-10 top-20 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full h-24 w-24 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-white text-center">
                    <div className="font-bold">25%</div>
                    <div className="text-xs">OFF</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom navbar and scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div 
            className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md flex items-center space-x-8 border border-white/20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {['Women', 'Men', 'Accessories', 'Collections'].map((item) => (
              <motion.a 
                key={item} 
                href="#"
                className="text-white/80 hover:text-white transition-colors relative"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Categories - Interactive Gallery */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <span className="inline-block py-1 px-3 rounded-md bg-indigo-100 text-indigo-800 font-medium text-sm mb-4">CURATED SELECTION</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-700">
                  Categories That Inspire
                </span>
              </h2>
              <p className="text-neutral-600 text-lg">Explore our handpicked selections, each crafted to help you express your unique style identity.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/shop" className="group inline-flex items-center text-lg text-indigo-700 font-medium hover:text-purple-700 transition-colors">
                <span className="mr-2">View all categories</span>
                <span className="transform transition-transform group-hover:translate-x-1">
                  <FiArrowRight />
                </span>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link 
                  to={`/shop/${category.slug}`} 
                  className="block group relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-opacity group-hover:opacity-70"></div>
                  <motion.div 
                    className="absolute inset-0 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover object-center transition-all duration-700"
                    />
                  </motion.div>
                  
                  <div className="absolute bottom-0 left-0 z-20 p-8 text-white w-full transform transition-transform duration-500 group-hover:translate-y-0 translate-y-4">
                    <motion.h3
                      className="text-3xl font-bold mb-3"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {category.name}
                    </motion.h3>
                    <p className="text-white/80 mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index === 0 ? "Elegant designs that embody sophistication and luxury" : 
                       index === 1 ? "Premium quality for the modern, confident individual" : 
                       "Exclusive pieces to complete your signature look"}
                    </p>
                    <motion.div 
                      className="inline-flex items-center group/btn"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2 font-medium">Discover now</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">
                        <FiArrowRight />
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <motion.div 
                      className="h-12 px-4 rounded-full bg-white/20 backdrop-blur-md flex items-center font-medium text-white border border-white/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {index === 0 ? "24 Collections" : index === 1 ? "18 Collections" : "32 Collections"}
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products - Modern Card Design */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-100">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-md bg-purple-100 text-purple-800 font-medium text-sm mb-4">TRENDING NOW</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Featured Selection</h2>
            <p className="text-neutral-600 text-lg">Discover our most coveted pieces, handpicked for exceptional quality and design.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                  {/* Product flags */}
                  <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="py-1 px-3 bg-purple-600 text-white text-xs font-bold rounded-md">NEW</span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="py-1 px-3 bg-red-500 text-white text-xs font-bold rounded-md">-{product.discountPercentage}%</span>
                    )}
                  </div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
                    <motion.button 
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-600 hover:text-red-500 hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiHeart className="w-5 h-5" />
                    </motion.button>
                    <motion.button 
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-600 hover:text-indigo-600 hover:bg-white transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiShoppingBag className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Image container with hover effect */}
                  <div className="h-80 overflow-hidden">
                    <div className="relative w-full h-full">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Product info */}
                  <div className="p-6 bg-white relative z-20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : ''}`} />
                        ))}
                        <span className="ml-2 text-sm text-neutral-500">({product.reviewCount})</span>
                      </div>
                      <span className="text-sm text-neutral-500">In Stock</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2 group-hover:text-indigo-700 transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discountPercentage > 0 ? (
                          <div className="flex items-center">
                            <span className="text-indigo-700 font-bold text-lg">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className="ml-2 text-neutral-500 line-through text-sm">${product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-indigo-700 font-bold text-lg">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <Link 
                        to={`/product/${product.id}`}
                        className="text-indigo-700 font-medium text-sm flex items-center group/link"
                      >
                        <span>Details</span>
                        <FiArrowRight className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Quick buy overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-700 to-purple-700 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View all products button */}
          <div className="flex justify-center mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/shop" 
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium flex items-center shadow-lg shadow-indigo-600/20"
              >
                View All Products
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Lifestyle Banner Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-96 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/80 via-indigo-900/60 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Women's Collection" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end text-white">
                <h3 className="text-3xl font-bold mb-2">Women's Collection</h3>
                <p className="text-white/80 mb-6">Elegance redefined for the modern woman</p>
                <Link 
                  to="/shop/women" 
                  className="inline-flex items-center text-lg font-medium group"
                >
                  <span>Explore Collection</span>
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden h-96 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 via-purple-900/60 to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Men's Collection" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end text-white">
                <h3 className="text-3xl font-bold mb-2">Men's Collection</h3>
                <p className="text-white/80 mb-6">Contemporary styles for the distinguished man</p>
                <Link 
                  to="/shop/men" 
                  className="inline-flex items-center text-lg font-medium group"
                >
                  <span>Explore Collection</span>
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonial - Modern Floating Card */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -bottom-[400px] -left-[400px] w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 shadow-2xl">
              {/* Testimonial quote marks */}
              <div className="mb-8 flex justify-center">
                <svg className="w-16 h-16 text-purple-300/80" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.077-1.928.712-2.935.556-.89 1.236-1.45 2.038-1.68l-.382-.7c-1.32.395-2.38 1.186-3.12 2.37-.83 1.343-1.21 2.84-1.12 4.55.11 2.138 1.16 3.674 2.92 4.11.66.162 1.33.123 2.01-.14.684-.27 1.223-.72 1.62-1.37.396-.64.594-1.37.594-2.15zm9.97 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.694-1.327-.824-.56-.126-1.074-.132-1.54-.028-.17-.95.067-1.93.7-2.94.556-.89 1.237-1.45 2.04-1.68l-.38-.7c-1.324.394-2.387 1.184-3.127 2.37-.83 1.345-1.2 2.842-1.11 4.55.11 2.14 1.16 3.673 2.92 4.11.66.162 1.33.123 2.01-.14.685-.27 1.225-.72 1.622-1.37.396-.65.594-1.37.594-2.15z" />
                </svg>
              </div>
              
              {/* Testimonial text with glowing effect */}
              <motion.div
                animate={{ 
                  boxShadow: ['0 0 0 rgba(168, 85, 247, 0)', '0 0 20px rgba(168, 85, 247, 0.3)', '0 0 0 rgba(168, 85, 247, 0)'] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl"
              >
                <blockquote className="text-center">
                  <p className="text-2xl md:text-3xl leading-relaxed mb-10">
                    <span className="italic">"LUXE has transformed my wardrobe with their impeccable designs and attention to every detail. Their pieces are timeless yet contemporary, perfect for making a statement."</span>
                  </p>
                </blockquote>
              </motion.div>
              
              {/* Customer profile */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-400/30 p-1 shadow-xl shadow-purple-500/20 mb-4">
                  <img 
                    src="https://images.pexels.com/photos/4750165/pexels-photo-4750165.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="Emma Thompson" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-xl">Emma Thompson</p>
                  <p className="text-indigo-200 text-sm">Creative Director, Milano</p>
                </div>
              </div>
              
              {/* Testimonial navigation dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {[0, 1, 2].map((_, i) => (
                  <motion.button 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
                    whileHover={{ scale: 1.5 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
export default Home