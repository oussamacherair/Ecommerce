
import {  AiOutlineMail, AiOutlineUser, AiOutlineLock, AiOutlineCheck } from 'react-icons/ai';
import "./SignUp.css"
const SignUp = () => {
  

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join us today and start your journey</p>
        </div>

        <div  className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-wrapper">
                <AiOutlineUser className="input-icon" size={20} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                 
                  placeholder="Enter your first name"
                />
              </div>
            
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <AiOutlineUser className="input-icon" size={20} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  
                  placeholder="Enter your last name"
                />
              </div>
           
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <AiOutlineMail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
            
                placeholder="Enter your email address"
              />
            </div>
         
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <AiOutlineLock className="input-icon" size={20} />
              <input
            
                id="password"
                name="password"
               
                placeholder="Create a password"
              />
              <button
                type="button"
                className="toggle-password"
               
              >
             
              </button>
            </div>
         
            <div className="password-requirements">
              <small>Password must be at least 8 characters long</small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <AiOutlineLock className="input-icon" size={20} />
              <input
           
                id="confirmPassword"
                name="confirmPassword"
               
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="toggle-password"
              
              />
              
            </div>
           
          </div>

          <div className="terms-checkbox">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span className="checkmark">
                <AiOutlineCheck size={14} />
              </span>
              I agree to the <a href="#" className="link">Terms of Service</a> and <a href="#" className="link">Privacy Policy</a>
            </label>
          </div>

          <button 
            type="submit" 
           
          >
            Sign Up

          </button>
        </div>

        <div className="signup-footer">
          <p>Already have an account? <a href="#" className="link">Sign in</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;