import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiInstagram, 
  FiTwitter, 
  FiFacebook, 
  FiYoutube,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiHeart,
  FiStar,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiArrowUp
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(true);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmailSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Gradient Accent Bar with Animation */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-primary-500 via-purple-500 via-yellow-500 to-primary-500 bg-size-200 animate-gradient-x"
      ></motion.div>
      
      {/* Premium Newsletter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-white via-gray-50 to-primary-50 py-16 lg:py-20 relative"
      >
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl border border-slate-700"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-primary-500 to-purple-600 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full animate-spin-slow"></div>
            </div>
            
            <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <motion.div 
                className="flex-1 text-center lg:text-left"
                variants={itemVariants}
              >
                <motion.h3 
                  className="text-white font-serif text-3xl lg:text-5xl font-light mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Experience{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent font-medium italic animate-gradient-x bg-size-200">
                    True Luxury
                  </span>
                </motion.h3>
                <motion.p 
                  className="text-gray-300 text-lg mb-0 lg:pr-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join our exclusive community and receive VIP access to limited edition products, 
                  personalized recommendations, and early access to sales.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-auto flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  {!emailSubscribed ? (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubscribe}
                      className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="relative group">
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address" 
                          className="w-full lg:w-80 px-6 py-4 border-2 border-slate-600 bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 group-hover:border-slate-500"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <motion.button 
                        type="submit" 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl flex items-center gap-2 group"
                      >
                        <span>Subscribe Now</span>
                        <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex items-center gap-3 text-green-400 text-lg font-medium"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FiHeart className="w-4 h-4 text-white" />
                      </motion.div>
                      <span>Welcome to our luxury family! ✨</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust Badges Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white py-12 border-b border-gray-100"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FiTruck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: FiShield, title: "Secure Payment", desc: "100% protected checkout" },
              { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: FiHeadphones, title: "24/7 Support", desc: "Dedicated customer care" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-default"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full flex items-center justify-center group-hover:from-primary-500 group-hover:to-purple-600 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Main Footer Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-slate-50 via-white to-primary-50 text-slate-700 py-16 lg:py-20 relative"
      >
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-6"
              >
                <Link to="/" className="group">
                  <div className="font-serif text-3xl font-bold">
                    <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Luxury
                    </span>
                    <span className="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                      Commerce
                    </span>
                  </div>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                </Link>
              </motion.div>
              
              <p className="text-slate-600 mb-8 leading-relaxed">
                Elevating everyday experiences through thoughtfully curated luxury products 
                that embody craftsmanship, heritage, and exceptional quality.
              </p>
              
              <div className="flex space-x-3">
                {[
                  { icon: FiInstagram, color: 'hover:bg-pink-500', label: 'Instagram' },
                  { icon: FiTwitter, color: 'hover:bg-blue-500', label: 'Twitter' },
                  { icon: FiFacebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                  { icon: FiYoutube, color: 'hover:bg-red-500', label: 'YouTube' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-11 h-11 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-transparent hover:text-white transition-all duration-300 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            {/* Shop Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-serif text-xl font-semibold text-slate-900 mb-8 relative">
                Shop
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"></div>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'All Products', path: '/shop' },
                  { name: 'New Arrivals', path: '/shop?category=new-arrivals' },
                  { name: 'Best Sellers', path: '/shop?category=best-sellers' },
                  { name: 'Sale Items', path: '/shop?category=sale' },
                  { name: 'Collections', path: '/shop?category=collections' }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.path} 
                      className="group inline-flex items-center text-slate-600 hover:text-primary-600 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="mr-3 w-4 h-4 flex items-center justify-center"
                      >
                        <FiChevronRight className="w-3 h-3 text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Information Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-serif text-xl font-semibold text-slate-900 mb-8 relative">
                Information
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"></div>
              </h4>
              <ul className="space-y-4">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Shipping Policy', path: '/shipping' },
                  { name: 'Returns & Exchanges', path: '/returns' },
                  { name: 'Privacy Policy', path: '/privacy' },
                  { name: 'Terms & Conditions', path: '/terms' }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.path} 
                      className="group inline-flex items-center text-slate-600 hover:text-primary-600 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="mr-3 w-4 h-4 flex items-center justify-center"
                      >
                        <FiChevronRight className="w-3 h-3 text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </motion.div>
                      <span className="relative">
                        {item.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Column */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="font-serif text-xl font-semibold text-slate-900 mb-8 relative">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600"></div>
              </h4>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start group cursor-default"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-4 mt-1 group-hover:bg-primary-500 transition-colors">
                    <FiMapPin className="w-3 h-3 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    1234 Luxury Lane<br />
                    New York, NY 10001
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4 group-hover:bg-green-500 transition-colors">
                    <FiPhone className="w-3 h-3 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <a 
                    href="tel:+12125551234" 
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    +1 (212) 555-1234
                  </a>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-500 transition-colors">
                    <FiMail className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <a 
                    href="mailto:support@luxurycommerce.com" 
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    support@luxurycommerce.com
                  </a>
                </motion.div>
                
                <div className="pt-6">
                  <h5 className="text-slate-900 font-semibold mb-4 flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-500 mr-2" />
                    Store Hours
                  </h5>
                  <div className="text-slate-600 space-y-1 text-sm leading-relaxed">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9am - 8pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10am - 6pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">12pm - 5pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-slate-900 py-8 relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/5 to-transparent animate-shimmer"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.p 
              className="text-slate-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span>&copy; {currentYear} LuxuryCommerce. All rights reserved.</span>
              <span className="text-red-500">Made By DIVYA</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                ❤️
              </motion.span>
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {['VISA', 'MC', 'AMEX', 'PYPL', 'APPLE'].map((payment, index) => (
                <motion.div
                  key={payment}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-lg text-xs flex items-center justify-center font-bold text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {payment}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;