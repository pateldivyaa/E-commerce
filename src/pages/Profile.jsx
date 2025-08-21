import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiCreditCard, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

const mockOrders = [
  {
    id: 'ORD123456',
    date: 'July 15, 2025',
    status: 'Delivered',
    total: 329.95,
    items: [
      { name: 'Cashmere Blend Sweater', quantity: 1, price: 129.99 },
      { name: 'Leather Crossbody Bag', quantity: 1, price: 199.99 }
    ]
  },
  {
    id: 'ORD123457',
    date: 'June 28, 2025',
    status: 'Processing',
    total: 189.99,
    items: [
      { name: 'Silk Slip Dress', quantity: 1, price: 189.99 }
    ]
  }
];

const Profile = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  
  if (!user) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-3xl font-heading font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-6 bg-primary-900 text-white text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-accent-500 flex items-center justify-center text-2xl font-bold mb-4">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <h3 className="text-lg font-bold">{user.name || 'User'}</h3>
                <p className="text-neutral-300 text-sm">{user.email}</p>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-md ${
                    activeTab === 'overview' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FiUser className="mr-3" />
                  <span>Account Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-md ${
                    activeTab === 'orders' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FiShoppingBag className="mr-3" />
                  <span>Orders</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-md ${
                    activeTab === 'wishlist' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FiHeart className="mr-3" />
                  <span>Wishlist</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-md ${
                    activeTab === 'addresses' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FiMapPin className="mr-3" />
                  <span>Addresses</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center text-left px-4 py-3 rounded-md ${
                    activeTab === 'payment' 
                      ? 'bg-primary-100 text-primary-900' 
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <FiCreditCard className="mr-3" />
                  <span>Payment Methods</span>
                </button>
                
                <button
                  onClick={logout}
                  className="w-full flex items-center text-left px-4 py-3 rounded-md text-error-600 hover:bg-neutral-50"
                >
                  <FiLogOut className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-grow">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
                  <h2 className="text-xl font-bold mb-6">Account Overview</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                          <div className="border rounded-md px-4 py-2 bg-neutral-50">
                            {user.name || 'Not provided'}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                          <div className="border rounded-md px-4 py-2 bg-neutral-50">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <button className="text-accent-600 hover:text-accent-700 text-sm mt-3">
                        Edit
                      </button>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-6">
                      <h3 className="text-lg font-medium mb-2">Privacy & Security</h3>
                      <div>
                        <button className="text-accent-600 hover:text-accent-700 text-sm block mb-2">
                          Change Password
                        </button>
                        <button className="text-accent-600 hover:text-accent-700 text-sm block">
                          Manage Communication Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-soft p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-accent-600 hover:text-accent-700 text-sm"
                    >
                      View All
                    </button>
                  </div>
                  
                  {mockOrders.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.slice(0, 2).map(order => (
                        <div key={order.id} className="border rounded-md p-4">
                          <div className="flex flex-wrap justify-between items-center mb-3">
                            <div>
                              <span className="text-sm text-neutral-500">Order</span>
                              <span className="font-medium ml-2">{order.id}</span>
                            </div>
                            <div>
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-success-100 text-success-900' 
                                  : 'bg-warning-100 text-warning-900'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-sm text-neutral-600 mb-3">
                            <span>{order.date}</span>
                            <span className="mx-2">•</span>
                            <span>${order.total.toFixed(2)}</span>
                            <span className="mx-2">•</span>
                            <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                          </div>
                          
                          <button className="text-accent-600 hover:text-accent-700 text-sm">
                            View Order Details
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-600 mb-4">You haven't placed any orders yet.</p>
                      <button
                        onClick={() => navigate('/shop')}
                        className="btn-outline"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-soft p-6"
              >
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                
                {mockOrders.length > 0 ? (
                  <div className="space-y-6">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border rounded-md p-6">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <div>
                            <span className="text-sm text-neutral-500">Order</span>
                            <span className="font-medium ml-2">{order.id}</span>
                          </div>
                          <div>
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-success-100 text-success-900' 
                                : 'bg-warning-100 text-warning-900'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-neutral-600 mb-4">
                          <p>Placed on {order.date}</p>
                        </div>
                        
                        <div className="space-y-4 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex-grow">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-neutral-200 pt-4 flex justify-between">
                          <span className="font-bold">Total</span>
                          <span className="font-bold">${order.total.toFixed(2)}</span>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button className="btn-outline text-sm px-4 py-2">
                            View Order Details
                          </button>
                          <button className="btn-ghost text-sm px-4 py-2">
                            Track Package
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-600 mb-4">You haven't placed any orders yet.</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="btn-outline"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Placeholder content for other tabs */}
            {activeTab === 'wishlist' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-soft p-6"
              >
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                <div className="text-center py-8">
                  <p className="text-neutral-600 mb-4">Your wishlist is empty.</p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="btn-outline"
                  >
                    Browse Products
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-soft p-6"
              >
                <h2 className="text-xl font-bold mb-6">My Addresses</h2>
                <div className="text-center py-8">
                  <p className="text-neutral-600 mb-4">You don't have any saved addresses yet.</p>
                  <button className="btn-outline">
                    Add New Address
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-soft p-6"
              >
                <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
                <div className="text-center py-8">
                  <p className="text-neutral-600 mb-4">You don't have any saved payment methods.</p>
                  <button className="btn-outline">
                    Add Payment Method
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile