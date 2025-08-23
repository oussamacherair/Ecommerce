import React, { useState } from 'react';
import { 
  AiOutlineEye, 
  AiOutlineEyeInvisible, 
  AiOutlineMail, 
  AiOutlineLock,
  AiOutlineLoading3Quarters
} from 'react-icons/ai';
import { 
  FcGoogle 
} from 'react-icons/fc';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaGithub, 
  FaApple 
} from 'react-icons/fa';
import "./SignIn.css"

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('SignIn data:', formData);
      setIsSubmitting(false);
      alert('Signed in successfully!');
    }, 2000);
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    
    // Simulate social login API call
    setTimeout(() => {
      console.log(`${provider} login initiated`);
      setSocialLoading('');
      alert(`${provider} login successful!`);
    }, 2000);
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: FcGoogle,
      bgColor: '#ffffff',
      textColor: '#374151',
      borderColor: '#d1d5db'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      bgColor: '#1877f2',
      textColor: '#ffffff',
      borderColor: '#1877f2'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      bgColor: '#1da1f2',
      textColor: '#ffffff',
      borderColor: '#1da1f2'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      bgColor: '#333333',
      textColor: '#ffffff',
      borderColor: '#333333'
    },
    {
      name: 'Apple',
      icon: FaApple,
      bgColor: '#000000',
      textColor: '#ffffff',
      borderColor: '#000000'
    }
  ];

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {/* Social Login Section */}
        <div className="social-login-section">
          <div className="social-providers-grid">
            {socialProviders.map((provider) => {
              const Icon = provider.icon;
              return (
                <button
                  key={provider.name}
                  onClick={() => handleSocialLogin(provider.name)}
                  disabled={socialLoading === provider.name}
                  className="social-login-btn"
                  style={{
                    backgroundColor: provider.bgColor,
                    color: provider.textColor,
                    borderColor: provider.borderColor
                  }}
                >
                  {socialLoading === provider.name ? (
                    <AiOutlineLoading3Quarters className="loading-icon" size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                  <span>{provider.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="divider">
          <span>Or continue with email</span>
        </div>

        {/* Email Login Form */}
        <div className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <AiOutlineMail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <AiOutlineLock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            onClick={handleSubmit}
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="signin-footer">
          <p>Don't have an account? <a href="#" className="link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;