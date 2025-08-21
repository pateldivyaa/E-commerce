import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Context Providers
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './components/Card/ToastContext'

// Layout Components
import Layout from './layouts/Layout'
import PrivateRoute from './components/auth/PrivateRoute'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
// import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ToastProvider>
      <CartProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              
              {/* Private Routes */}
              <Route path="checkout" element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              } />
              {/* <Route path="dashboard/*" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } /> */}
              
              {/* Auth Routes */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </CartProvider>
    </ToastProvider>
  )
}

export default App