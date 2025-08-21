import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  
  const { 
    register: registerField, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm()
  
  const password = watch('password', '')
  
  const onSubmit = async (data) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password
      })
      // Redirect will happen in the register function
    } catch (error) {
      // Error is handled in the auth context
      console.error('Registration submission error:', error)
    }
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding/Image */}
      <div className="hidden lg:block lg:w-1/2 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 to-primary-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        
        <div className="relative flex flex-col h-full justify-center p-12 text-white">
          <div className="mb-8">
            <h2 className="text-4xl font-heading font-bold mb-4">LUXE</h2>
            <div className="w-12 h-1 bg-accent-500"></div>
          </div>
          
          <h3 className="text-3xl font-heading mb-6">Join our exclusive community</h3>
          
          <div className="space-y-6 mb-8">
            <p>Create an account to enjoy:</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Early access to new collections</p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Member-only discounts</p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Save your favorite items</p>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Track orders and order history</p>
              </div>
            </div>
          </div>
          
          <blockquote>
            <p className="text-xl italic mb-4">"Luxury is in the details."</p>
          </blockquote>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate(-1)} 
            className="mb-8 flex items-center text-primary-700 hover:text-primary-900 transition"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">Create an account</h1>
              <p className="text-neutral-600 mb-8">Join us for an exclusive shopping experience</p>
            </motion.div>
            
            <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className={`form-control ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="John Doe"
                  {...registerField('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    }
                  })}
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="john@example.com"
                  {...registerField('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    }
                  })}
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Create a password"
                    {...registerField('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="form-error">{errors.password.message}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-control ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Confirm your password"
                    {...registerField('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
              </div>
              
              <div className="form-group">
                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAndPrivacy"
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
                      {...registerField('termsAndPrivacy', { 
                        required: 'You must agree to the terms and privacy policy'
                      })}
                    />
                  </div>
                  <label htmlFor="termsAndPrivacy" className="ml-2 text-sm text-neutral-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-accent-600 hover:text-accent-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-accent-600 hover:text-accent-700">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.termsAndPrivacy && <p className="form-error">{errors.termsAndPrivacy.message}</p>}
              </div>
              
              <div className="form-group">
                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </button>
              </div>
            </motion.form>
            
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-neutral-600">
                Already have an account? {' '}
                <Link to="/login" className="text-accent-600 hover:text-accent-700 font-medium">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Register