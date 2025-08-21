import { createContext, useContext, useReducer, useEffect } from 'react'

// API base URL - adjust this according to your backend URL
const API_BASE_URL = 'http://localhost:3000/api' // Change this to match your backend URL

// Helper function to get auth token
const getAuthToken = () => {
  // Get token from localStorage or wherever you store it
  return localStorage.getItem('token') || sessionStorage.getItem('token')
}

// Helper function to make authenticated API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken()
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  })
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  
  return response.json()
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload
      }
    }
    
    case 'LOAD_CART': {
      return {
        ...state,
        items: action.payload.items || [],
        cartData: action.payload,
        loading: false
      }
    }
    
    case 'ADD_TO_CART_SUCCESS': {
      return {
        ...state,
        items: action.payload.items || [],
        cartData: action.payload,
        loading: false
      }
    }
    
    case 'UPDATE_CART_SUCCESS': {
      return {
        ...state,
        items: action.payload.items || [],
        cartData: action.payload,
        loading: false
      }
    }
    
    case 'REMOVE_FROM_CART_SUCCESS': {
      return {
        ...state,
        items: action.payload.items || [],
        cartData: action.payload,
        loading: false
      }
    }
    
    case 'CLEAR_CART_SUCCESS': {
      return {
        ...state,
        items: [],
        cartData: null,
        loading: false
      }
    }
    
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }
    
    default:
      return state
  }
}

// Initial cart state
const initialState = {
  items: [],
  cartData: null,
  loading: false,
  error: null
}

// Create context
const CartContext = createContext()

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from backend on component mount
  useEffect(() => {
    loadCart()
  }, [])
  
  // Load cart from backend
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      const cartData = await apiCall('/getCart')
      
      // Transform backend cart data to match frontend structure
      const transformedItems = cartData.items?.map(item => ({
        id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        description: item.productId.description,
        category: item.productId.category,
        quantity: item.quantity,
        // Add any other product fields you need
      })) || []
      
      dispatch({ 
        type: 'LOAD_CART', 
        payload: { 
          ...cartData, 
          items: transformedItems 
        } 
      })
      
    } catch (error) {
      console.error('Error loading cart:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
      // If cart doesn't exist (404), that's okay - user has empty cart
      if (error.message.includes('404') || error.message.includes('Cart not found')) {
        dispatch({ type: 'LOAD_CART', payload: { items: [] } })
      }
    }
  }
  
  // Add item to cart
  const addToCart = async (product, showToastCallback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      console.log('Adding to cart:', product)
      
      // Send request to backend
      const response = await apiCall('/addToCart', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.productId || product.id,
          quantity: product.quantity || 1
        })
      })
      
      // Transform backend response
      const transformedItems = response.items?.map(item => ({
        id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        description: item.productId.description,
        category: item.productId.category,
        quantity: item.quantity,
      })) || []
      
      dispatch({ 
        type: 'ADD_TO_CART_SUCCESS', 
        payload: { 
          ...response, 
          items: transformedItems 
        } 
      })
      
      // Show success toast
      if (showToastCallback && typeof showToastCallback === 'function') {
        const itemName = product.name || 'Item'
        let message = `${itemName} added to cart!`
        
        // Add size and color info if available
        const details = []
        if (product.selectedSize) details.push(`Size: ${product.selectedSize}`)
        if (product.selectedColor) details.push(`Color: ${product.selectedColor}`)
        
        if (details.length > 0) {
          message += ` (${details.join(', ')})`
        }
        
        showToastCallback(message, 'cart')
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
      // Show error toast
      if (showToastCallback && typeof showToastCallback === 'function') {
        showToastCallback('Failed to add item to cart. Please try again.', 'error')
      }
    }
  }
  
  // Update quantity (not implemented in backend, would need to add this endpoint)
  const updateQuantity = async (id, quantity, showToastCallback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        await removeFromCart(id, showToastCallback)
        return
      }
      
      // For now, we'll update locally and then reload cart
      // In a real app, you'd want to add an update endpoint to your backend
      
      // Find the item to get product info for re-adding
      const item = state.items.find(item => item.id === id)
      if (item) {
        // Remove the item first
        await apiCall(`/deletedProduct/${id}`, {
          method: 'DELETE'
        })
        
        // Then add it back with new quantity
        await apiCall('/addToCart', {
          method: 'POST',
          body: JSON.stringify({
            productId: item.productId,
            quantity: quantity
          })
        })
        
        // Reload cart to get updated data
        await loadCart()
        
        if (showToastCallback && typeof showToastCallback === 'function') {
          showToastCallback(`Updated ${item.name} quantity to ${quantity}`, 'cart')
        }
      }
      
    } catch (error) {
      console.error('Error updating quantity:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
      if (showToastCallback && typeof showToastCallback === 'function') {
        showToastCallback('Failed to update quantity. Please try again.', 'error')
      }
    }
  }
  
  // Remove item from cart
  const removeFromCart = async (id, showToastCallback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      const item = state.items.find(item => item.id === id)
      
      const response = await apiCall(`/deletedProduct/${id}`, {
        method: 'DELETE'
      })
      
      // Transform backend response
      const transformedItems = response.cart?.items?.map(item => ({
        id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        description: item.productId.description,
        category: item.productId.category,
        quantity: item.quantity,
      })) || []
      
      dispatch({ 
        type: 'REMOVE_FROM_CART_SUCCESS', 
        payload: { 
          ...response.cart, 
          items: transformedItems 
        } 
      })
      
      // Show success toast
      if (showToastCallback && typeof showToastCallback === 'function' && item) {
        showToastCallback(`${item.name} removed from cart!`, 'info')
      }
      
    } catch (error) {
      console.error('Error removing from cart:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
      if (showToastCallback && typeof showToastCallback === 'function') {
        showToastCallback('Failed to remove item from cart. Please try again.', 'error')
      }
    }
  }
  
  // Clear entire cart (you'd need to implement this endpoint in backend)
  const clearCart = async (showToastCallback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Since there's no clear cart endpoint, we'll remove items one by 
    
      // In a real app, you'd want to add a clear cart endpoint
      const itemIds = state.items.map(item => item.id)
      
      for (const itemId of itemIds) {
        await apiCall(`/deletedProduct/${itemId}`, {
          method: 'DELETE'
        })
      }
      
      dispatch({ type: 'CLEAR_CART_SUCCESS' })
      
      if (showToastCallback && typeof showToastCallback === 'function') {
        showToastCallback('Cart cleared!', 'info')
      }
      
    } catch (error) {
      console.error('Error clearing cart:', error)
      dispatch({ type: 'SET_ERROR', payload: error.message })
      
      if (showToastCallback && typeof showToastCallback === 'function') {
        showToastCallback('Failed to clear cart. Please try again.', 'error')
      }
    }
  }
  
  // Computed values
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  // Check if item is in cart
  const isInCart = (productId) => {
    return state.items.some(item => 
      item.productId === productId || 
      item.id === productId
    )
  }
  
  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    return state.items
      .filter(item => item.productId === productId)
      .reduce((total, item) => total + item.quantity, 0)
  }
  
  const value = {
    cart: state.items,
    cartData: state.cartData,
    cartItemsCount,
    cartTotal,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
    loadCart
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext