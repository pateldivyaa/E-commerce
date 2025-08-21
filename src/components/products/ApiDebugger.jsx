import React, { useState, useEffect } from 'react';
import authService from '../Service/authService';
import { ProductService } from '../Service/productService';

const ApiDebugger = () => {
  const [authStatus, setAuthStatus] = useState({
    hasToken: false,
    tokenValue: '',
    isValidToken: false
  });
  
  const [apiStatus, setApiStatus] = useState({
    canConnect: false,
    lastResponse: null,
    error: null
  });
  
  const [productCount, setProductCount] = useState(0);
  
  useEffect(() => {
    checkAuthStatus();
    checkApiStatus();
  }, []);
  
  const checkAuthStatus = () => {
    const token = authService.getToken();
    
    setAuthStatus({
      hasToken: !!token,
      tokenValue: token ? `${token.substring(0, 10)}...` : 'No token',
      isValidToken: false // Will be updated after API check
    });
  };
  
  const checkApiStatus = async () => {
    try {
      setApiStatus(prev => ({ ...prev, error: null }));
      
      // First check token validity
      const tokenStatus = await ProductService.validateToken();
      setAuthStatus(prev => ({ ...prev, isValidToken: tokenStatus.valid }));
      
      if (!tokenStatus.valid) {
        setApiStatus({
          canConnect: true,
          lastResponse: null,
          error: `Token invalid: ${tokenStatus.reason}`
        });
        return;
      }
      
      // Try to fetch products
      const products = await ProductService.getAllProducts();
      setProductCount(products.length);
      
      setApiStatus({
        canConnect: true,
        lastResponse: `Fetched ${products.length} products successfully`,
        error: null
      });
    } catch (err) {
      console.error('API test error:', err);
      
      setApiStatus({
        canConnect: false,
        lastResponse: null,
        error: err.message || 'Unknown error'
      });
    }
  };
  
  const handleLogin = async () => {
    try {
      // This is just a test - use your own credentials
      const result = await authService.login('test@example.com', 'password123');
      
      if (result.success) {
        alert('Login successful!');
        checkAuthStatus();
        checkApiStatus();
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (err) {
      alert(`Login error: ${err.message}`);
    }
  };
  
  const handleLogout = () => {
    authService.logout();
    checkAuthStatus();
    alert('Logged out successfully!');
  };
  
  const handleRefreshProducts = async () => {
    try {
      await checkApiStatus();
    } catch (err) {
      alert(`Error refreshing: ${err.message}`);
    }
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">API Connection Debugger</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Authentication Status</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-medium">Has Token:</div>
          <div className={authStatus.hasToken ? 'text-green-600' : 'text-red-600'}>
            {authStatus.hasToken ? 'Yes' : 'No'}
          </div>
          
          <div className="font-medium">Token Value:</div>
          <div className="font-mono text-xs truncate max-w-xs">{authStatus.tokenValue}</div>
          
          <div className="font-medium">Token Valid:</div>
          <div className={authStatus.isValidToken ? 'text-green-600' : 'text-red-600'}>
            {authStatus.isValidToken ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleLogin}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Test Login
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">API Connection Status</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-medium">Can Connect:</div>
          <div className={apiStatus.canConnect ? 'text-green-600' : 'text-red-600'}>
            {apiStatus.canConnect ? 'Yes' : 'No'}
          </div>
          
          <div className="font-medium">Products Count:</div>
          <div>{productCount}</div>
          
          {apiStatus.lastResponse && (
            <>
              <div className="font-medium">Last Response:</div>
              <div className="text-green-600">{apiStatus.lastResponse}</div>
            </>
          )}
          
          {apiStatus.error && (
            <>
              <div className="font-medium">Error:</div>
              <div className="text-red-600">{apiStatus.error}</div>
            </>
          )}
        </div>
        <div className="mt-4">
          <button
            onClick={handleRefreshProducts}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Refresh Products
          </button>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>If you're having issues:</p>
        <ol className="list-decimal ml-5 mt-1">
          <li>Ensure your API server is running on http://localhost:3000</li>
          <li>Check that you're logged in (has valid token)</li>
          <li>Verify that products are being added correctly in the admin panel</li>
          <li>Check browser console for any errors</li>
        </ol>
      </div>
    </div>
  );
};

export default ApiDebugger;