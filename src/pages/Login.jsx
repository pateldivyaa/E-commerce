import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import axios from 'axios';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight,
  ShoppingBag,
  Github,
  Apple
} from 'lucide-react';
import './Login.css';

// Custom icon components
const PenTool = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z"/>
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    <path d="m2 2 7.586 7.586"/>
    <circle cx="11" cy="11" r="2"/>
  </svg>
);

const Palette = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/>
    <circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5" cy="7.5" r=".5"/>
    <circle cx="6.5" cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const Camera = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate(); // Add navigation hook
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
    registerName: '',
    registerLastName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
    agreeTerms: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [animationClass, setAnimationClass] = useState('');
  
  // API URL from environment or default
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Animation effects when switching tabs
  useEffect(() => {
    setAnimationClass('fade-in');
    const timer = setTimeout(() => setAnimationClass(''), 700);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateLoginForm = () => {
    const errors = {};
    
    if (!formData.loginEmail) {
      errors.loginEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.loginEmail)) {
      errors.loginEmail = 'Email is invalid';
    }
    
    if (!formData.loginPassword) {
      errors.loginPassword = 'Password is required';
    } else if (formData.loginPassword.length < 6) {
      errors.loginPassword = 'Password must be at least 6 characters';
    }
    
    return errors;
  };
  
  const validateRegisterForm = () => {
    const errors = {};
    
    if (!formData.registerName) {
      errors.registerName = 'First name is required';
    } else if (formData.registerName.length < 2) {
      errors.registerName = 'First name must be at least 2 characters';
    }
    
    if (!formData.registerLastName) {
      errors.registerLastName = 'Last name is required';
    } else if (formData.registerLastName.length < 2) {
      errors.registerLastName = 'Last name must be at least 2 characters';
    }
    
    if (!formData.registerEmail) {
      errors.registerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.registerEmail)) {
      errors.registerEmail = 'Email is invalid';
    }
    
    if (!formData.registerPassword) {
      errors.registerPassword = 'Password is required';
    } else if (formData.registerPassword.length < 6) {
      errors.registerPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.registerConfirmPassword) {
      errors.registerConfirmPassword = 'Please confirm your password';
    } else if (formData.registerPassword !== formData.registerConfirmPassword) {
      errors.registerConfirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
  
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setError('');
      setSuccess('');
  
      try {
        // Attempt to log in with provided credentials
        const res = await axios.post(`${apiUrl}/login`, {
          email: formData.loginEmail,
          password: formData.loginPassword
        });
  
        // If response is successful (status 200), login was successful
        if (res.status === 200 && res.data && res.data.token) {
          // Store token and show success message
          localStorage.setItem('token', res.data.token);
          setSuccess('Login successful! Redirecting to home...');
          console.log('Login successful:', res.data);
          
          setTimeout(() => {
            // Navigate to home page
            navigate('/');
          }, 1500);
        } else {
          // If the response doesn't contain what we expect
          setError('Login failed. Unexpected response from server.');
        }
      } catch (err) {
        console.error('Login error:', err);
        
        // Always show "Login failed" message when there's any error
        setError('Login failed. Email or password is incorrect.');
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateRegisterForm();
    
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Create payload for API
      const payload = {
        name: formData.registerName,
        lastName: formData.registerLastName,
        email: formData.registerEmail,
        password: formData.registerPassword
      };
      
      try {
        const res = await axios.post(`${apiUrl}/register`, payload, { timeout: 5000 });
        setSuccess('Registration successful! Redirecting to home...');
        console.log('Registration successful:', res.data);
        
        // If registration includes token, store it
        if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        
        // Navigate to home page after a delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        console.error('Registration error:', err);
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="auth-page">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="container">
        <div className="auth-card">
          <div className="card-wrapper">
            {/* Left Side - Brand and Features */}
            <div className="brand-section">
              <div className="brand-logo">
                <div className="logo-circle">
                  <ShoppingBag size={32} />
                </div>
                <h2>CreativeShop</h2>
                <p>Discover the art of shopping</p>
              </div>
              
              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon teal">
                    <PenTool size={18} />
                  </div>
                  <div className="feature-content">
                    <h5>Creative Design</h5>
                    <p>Discover unique products from artists worldwide</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon amber">
                    <Palette size={18} />
                  </div>
                  <div className="feature-content">
                    <h5>Customizable Items</h5>
                    <p>Personalize products to match your style</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon rose">
                    <Camera size={18} />
                  </div>
                  <div className="feature-content">
                    <h5>Visualize Before Buying</h5>
                    <p>See how items look in your space with AR</p>
                  </div>
                </div>
              </div>
              
              <div className="brand-footer">
                <p>© 2025 CreativeShop. All rights reserved.</p>
              </div>
            </div>
            
            {/* Right Side - Forms */}
            <div className="form-section">
              <div className="mobile-logo">
                <div className="logo-circle">
                  <ShoppingBag size={28} />
                </div>
                <h3>CreativeShop</h3>
              </div>
              
              <div className="welcome-text">
                <h4>{activeTab === 'login' ? 'Welcome back!' : 'Join CreativeShop'}</h4>
                <p>{activeTab === 'login' ? 'Sign in to access your account' : 'Create an account to start shopping'}</p>
              </div>
              
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button 
                  className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>
              
              {error && <div className="alert error"><CheckCircle size={18} /> {error}</div>}
              {success && <div className="alert success"><CheckCircle size={18} /> {success}</div>}
              
              {/* Login Form */}
              {activeTab === 'login' && (
                <form className={`login-form ${animationClass}`} onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email Address</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        id="loginEmail"
                        name="loginEmail"
                        placeholder="email@example.com"
                        value={formData.loginEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    {formErrors.loginEmail && <span className="error-message">{formErrors.loginEmail}</span>}
                  </div>
                  
                  <div className="form-group">
                    <div className="label-row">
                      <label htmlFor="loginPassword">Password</label>
                      <a href="#" className="forgot-link">Forgot Password?</a>
                    </div>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="loginPassword"
                        name="loginPassword"
                        placeholder="••••••"
                        value={formData.loginPassword}
                        onChange={handleInputChange}
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {formErrors.loginPassword && <span className="error-message">{formErrors.loginPassword}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'} 
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  
                  <div className="divider">
                    <span>or continue with</span>
                  </div>
                  
                  <div className="social-buttons">
                    <button type="button" className="social-button google">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </button>
                    <button type="button" className="social-button github">
                      <Github size={18} />
                      Github
                    </button>
                  </div>
                  
                  <p className="switch-form">
                    Don't have an account? 
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>
                      Create Account
                    </a>
                  </p>
                </form>
              )}
              
              {/* Register Form */}
              {activeTab === 'register' && (
                <form className={`register-form ${animationClass}`} onSubmit={handleRegister}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="registerName">First Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          id="registerName"
                          name="registerName"
                          placeholder="John"
                          value={formData.registerName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.registerName && <span className="error-message">{formErrors.registerName}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="registerLastName">Last Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          id="registerLastName"
                          name="registerLastName"
                          placeholder="Doe"
                          value={formData.registerLastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.registerLastName && <span className="error-message">{formErrors.registerLastName}</span>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="registerEmail">Email Address</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        id="registerEmail"
                        name="registerEmail"
                        placeholder="email@example.com"
                        value={formData.registerEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    {formErrors.registerEmail && <span className="error-message">{formErrors.registerEmail}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="registerPassword">Password</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="registerPassword"
                        name="registerPassword"
                        placeholder="••••••"
                        value={formData.registerPassword}
                        onChange={handleInputChange}
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {formErrors.registerPassword && <span className="error-message">{formErrors.registerPassword}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="registerConfirmPassword">Confirm Password</label>
                    <div className="input-wrapper">
                      <span className="input-icon">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="registerConfirmPassword"
                        name="registerConfirmPassword"
                        placeholder="••••••"
                        value={formData.registerConfirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    {formErrors.registerConfirmPassword && <span className="error-message">{formErrors.registerConfirmPassword}</span>}
                  </div>
                  
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="agreeTerms">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                  {formErrors.agreeTerms && <span className="error-message terms-error">{formErrors.agreeTerms}</span>}
                  
                  <button 
                    type="submit" 
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'} 
                    {!loading && <ArrowRight size={18} />}
                  </button>
                  
                  <p className="switch-form">
                    Already have an account? 
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('login'); }}>
                      Login
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;