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
      console.log('Sending registration request with payload:', payload);
      
      // Add better error debugging
      const res = await axios.post(`${apiUrl}/register`, payload, { 
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setSuccess('Registration successful! You can now log in.');
      console.log('Registration successful:', res.data);
      
      // Switch to login tab after a delay
      setTimeout(() => {
        setActiveTab('login');
        // Reset register form
        setFormData({
          ...formData,
          registerName: '',
          registerLastName: '',
          registerEmail: '',
          registerPassword: '',
          registerConfirmPassword: '',
          agreeTerms: false
        });
      }, 2000);
    } catch (err) {
      console.error('Registration error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        url: `${apiUrl}/register`
      });
      
      // Display more specific error messages based on the response
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        if (err.response.status === 500) {
          setError('Server error. Please try again later or contact support.');
        } else if (err.response.status === 409) {
          setError('This email is already registered. Please try logging in.');
        } else if (err.response.status === 400 && err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError(`Registration failed: ${err.response.statusText}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  } else {
    setFormErrors(errors);
  }
};