import { createContext, useContext, useState } from 'react'
import Toast from '../Card/Toast' // Fixed import path

// Create Toast Context
const ToastContext = createContext()

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  // Add toast function
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      message,
      type,
      duration,
      isVisible: true 
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id // Return toast ID for manual removal if needed
  }

  // Specific function for cart success toasts
  const showCartSuccess = (message, type = 'cart') => {
    return showToast(message, type, 3000)
  }

  // Remove specific toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Clear all toasts
  const clearAllToasts = () => {
    setToasts([])
  }

  const value = {
    showToast,
    showCartSuccess,
    removeToast,
    clearAllToasts,
    toasts
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Render all active toasts */}
      <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto"
            style={{
              transform: `translateY(${20 + index * 80}px)`
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              isVisible={toast.isVisible}
              onClose={() => removeToast(toast.id)}
              duration={0} // Don't auto-close from Toast component since we handle it here
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Custom hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastContext