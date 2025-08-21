import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          // This would typically make a request to your backend to validate the token
          // For now, just simulating a successful auth
          setUser({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
          })
        }
      } catch (error) {
        console.error('Authentication error:', error)
        localStorage.removeItem('authToken')
        setToken(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [token])

  const login = async (email, password) => {
    setLoading(true)
    try {
      // This would be replaced with an actual API call to your backend
      // Example: const response = await axios.post('/api/auth/login', { email, password })
      
      // Simulating a successful login for demo
      const mockResponse = {
        user: {
          id: '1',
          name: 'John Doe',
          email: email,
        },
        token: 'mock-jwt-token',
      }
      
      setUser(mockResponse.user)
      setToken(mockResponse.token)
      localStorage.setItem('authToken', mockResponse.token)
      toast.success('Login successful!')
      return true
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      // This would be replaced with an actual API call to your backend
      // Example: const response = await axios.post('/api/auth/register', { name, email, password })
      
      // Simulating a successful registration for demo
      const mockResponse = {
        user: {
          id: '1',
          name: name,
          email: email,
        },
        token: 'mock-jwt-token',
      }
      
      setUser(mockResponse.user)
      setToken(mockResponse.token)
      localStorage.setItem('authToken', mockResponse.token)
      toast.success('Registration successful!')
      return true
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setToken(null)
    toast.info('You have been logged out')
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}