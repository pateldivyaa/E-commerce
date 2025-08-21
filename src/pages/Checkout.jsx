import { useState } from 'react'
import { CheckCircle, CreditCard, ArrowLeft, ArrowRight, ShoppingBag, Lock } from 'lucide-react'

const Checkout = () => {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [orderComplete, setOrderComplete] = useState(false)
  
  // Mock cart data
  const cart = [
    {
      id: 1,
      name: "Premium Wool Sweater",
      price: 89.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      selectedColor: "Navy",
      selectedSize: "L"
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      price: 69.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      selectedColor: "Blue",
      selectedSize: "32"
    }
  ]
  
  // Calculate totals
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = total > 200 ? 0 : 15
  const taxRate = 0.1 // 10%
  const tax = total * taxRate
  const orderTotal = total + shipping + tax
  
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }
  
  const onSubmitShipping = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }
  
  const onSubmitPayment = (e) => {
    e.preventDefault()
    setOrderComplete(true)
    window.scrollTo(0, 0)
  }
  
  const handleBack = () => {
    setStep(1)
    window.scrollTo(0, 0)
  }
  
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 transform transition-all">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-center mb-8">
            Your order has been placed successfully. You will receive an email confirmation shortly.
          </p>
          <p className="font-medium text-center mb-8 text-lg">
            Order #: ORD-{Math.floor(Math.random() * 1000000)}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-50 transition-colors">
              Continue Shopping
            </button>
            <button className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
              View Order
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Complete Your Purchase</h1>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all ${
              step >= 1 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`flex-grow h-1 transition-all ${
              step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all ${
              step >= 2 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-3 px-2">
            <span className={`font-medium transition-all ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
              Shipping
            </span>
            <span className={`font-medium transition-all ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 transform transition-all">
                <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-4">
                  <ShoppingBag className="w-6 h-6 mr-2 text-blue-600" />
                  Shipping Information
                </h2>
                
                <form onSubmit={onSubmitShipping}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="123 Main St"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Apt 4B"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="New York"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="NY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="10001"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>Select a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-10">
                    <button 
                      type="button" 
                      className="flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </button>
                    <button 
                      type="submit" 
                      className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 transform transition-all">
                <h2 className="text-2xl font-bold mb-6 flex items-center border-b pb-4">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-4 mb-8">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Credit Card</span>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or American Express</p>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <div className="w-10 h-6 bg-blue-100 rounded"></div>
                      <div className="w-10 h-6 bg-red-100 rounded"></div>
                      <div className="w-10 h-6 bg-gray-100 rounded"></div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">PayPal</span>
                      <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-16 h-6 bg-blue-100 rounded"></div>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <form onSubmit={onSubmitPayment}>
                    <div className="space-y-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start mb-8">
                      <Lock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Your payment information is secure. We use industry-standard encryption to protect your data.
                      </p>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                      >
                        Place Order
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </form>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8 text-center">
                      <p className="text-gray-700 mb-6">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      
                      <div className="w-32 h-8 bg-blue-100 rounded mx-auto"></div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </button>
                      <button 
                        onClick={onSubmitPayment}
                        className="flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                      >
                        Continue to PayPal
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-blue-600" />
                Order Summary
              </h2>
              
              <div className="space-y-6 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="relative mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="text-sm text-gray-500 mt-1">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedColor && item.selectedSize && <span> / </span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      )}
                      <div className="text-sm font-medium text-gray-700 mt-2">
                        {formatPrice(item.price)} x {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(orderTotal)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-right">
                    Including VAT
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Lock className="h-4 w-4 mr-2 text-green-600" />
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout