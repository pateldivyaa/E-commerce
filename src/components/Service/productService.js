// productService.js
import authService from './authService';

// Consistently define the API base URL
const API_URL = "http://localhost:3000/api";

// Create headers with authentication token
const getHeaders = (hasFormData = false) => {
  const headers = {};
  const token = authService.getToken();

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn("No authentication token found");
  }

  if (!hasFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

// Handle API response
async function handleResponse(res) {
  if (!res.ok) {
    try {
      const data = await res.json();
      
      // Improved token expiration detection
      if (res.status === 401 || 
          data.message?.toLowerCase().includes('authentication') || 
          data.message?.toLowerCase().includes('token') ||
          data.message?.toLowerCase().includes('unauthorized')) {
        const authError = new Error(data.message || "Authentication failed. Please log in again.");
        authError.status = res.status;
        throw authError;
      }
      
      throw new Error(data.message || `Server responded with status ${res.status}`);
    } catch (e) {
      if (e.status === 401 || res.status === 401) {
        const authError = new Error("Authentication failed. Please log in again.");
        authError.status = 401;
        throw authError;
      }
      throw new Error(`Request failed with status ${res.status}`);
    }
  }
  return res.json();
}

// Handle authentication errors
const handleAuthError = (error) => {
  console.error("Authentication error:", error);
  // Clear authentication data
  authService.logout();
  
  // Create a user-friendly message
  const message = "Your session has expired. Please log in again.";
  
  return { message, originalError: error };
};

export const ProductService = {
  // Validate token
  validateToken: async () => {
    try {
      if (!authService.getToken()) {
        return { valid: false, reason: "No token found" };
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Use a lightweight endpoint to validate token
      const res = await fetch(`${API_URL}/getAllProducts`, {
        headers: getHeaders(),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (res.ok) {
        return { valid: true };
      } else {
        // Token is invalid/expired
        if (res.status === 401) {
          handleAuthError(new Error("Token expired or invalid"));
          return { valid: false, reason: "Token expired" };
        }
        
        return { valid: false, reason: `Server error: ${res.status}` };
      }
    } catch (error) {
      console.error("Token validation error:", error);
      
      if (error.name === 'AbortError') {
        return { valid: false, reason: "Validation request timed out" };
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return { valid: false, reason: "Connection to server failed" };
      }
      
      return { valid: false, reason: error.message };
    }
  },

  // Get all products
  getAllProducts: async () => {
    try {
      // First validate token
      const tokenStatus = await ProductService.validateToken();
      if (!tokenStatus.valid) {
        throw new Error(`Authentication required: ${tokenStatus.reason}`);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch(`${API_URL}/getAllProducts`, {
        headers: getHeaders(),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return handleResponse(res);
    } catch (error) {
      // Handle authentication errors
      if (error.status === 401 || error.message?.includes('Authentication')) {
        handleAuthError(error);
      }
      
      if (error.name === 'AbortError') {
        throw new Error("Request timed out. The server might be down or unresponsive.");
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error("Connection to server failed. Please check if the API server is running.");
      }
      throw error;
    }
  },

  // Add a new product
  addProduct: async (formData) => {
    try {
      // Check if we have a token
      const token = authService.getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // Longer timeout for uploads
      
      // Make sure we're using the correct endpoint according to your Routes.js
      const res = await fetch(`${API_URL}/productAdd`, {
        method: "POST",
        headers: getHeaders(true), // true for FormData
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return handleResponse(res);
    } catch (error) {
      // Handle authentication errors
      if (error.status === 401 || error.message?.includes('Authentication')) {
        handleAuthError(error);
      }
      
      if (error.name === 'AbortError') {
        throw new Error("Upload timed out. The server might be down or your connection is slow.");
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error("Connection to server failed. Please check if the API server is running.");
      }
      throw error;
    }
  },

  // Update a product
  updateProduct: async (id, productData) => {
    try {
      // Check if we have a token
      const token = authService.getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const res = await fetch(`${API_URL}/updateProduct/${id}`, {
        method: 'PUT',
        headers: getHeaders(true), // true for FormData
        body: productData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return handleResponse(res);
    } catch (error) {
      // Handle authentication errors
      if (error.status === 401 || error.message?.includes('Authentication')) {
        handleAuthError(error);
      }
      
      if (error.name === 'AbortError') {
        throw new Error("Update request timed out. The server might be down or your connection is slow.");
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error("Connection to server failed. Please check if the API server is running.");
      }
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      // Check if we have a token
      const token = authService.getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch(`${API_URL}/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return handleResponse(res);
    } catch (error) {
      // Handle authentication errors
      if (error.status === 401 || error.message?.includes('Authentication')) {
        handleAuthError(error);
      }
      
      if (error.name === 'AbortError') {
        throw new Error("Delete request timed out. The server might be down or unresponsive.");
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error("Connection to server failed. Please check if the API server is running.");
      }
      throw error;
    }
  }
};