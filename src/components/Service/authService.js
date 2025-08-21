// authService.js

// Get the authentication token from localStorage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Set the authentication token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Logout user by removing token
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Login function
export const login = async (email, password) => {
  try {
    // API URL based on environment - make sure this matches your server
    const API_URL = 'http://localhost:3000/api';
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }
    
    // Store the token
    setAuthToken(data.token);
    
    return {
      success: true,
      message: 'Login successful',
      token: data.token,
      user: data.user // Include user data if available from your API
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred during login',
    };
  }
};

// Export default for compatibility with existing imports
export default {
  getToken,
  setAuthToken,
  isAuthenticated,
  logout,
  login
};