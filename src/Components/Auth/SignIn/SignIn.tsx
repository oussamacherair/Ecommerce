
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
            <button className="social-login-btn">
              <FcGoogle size={20} />
              <span>Google</span>
            </button>

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
                
              
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
              
              >
             SignIN
              </button>
            </div>
      
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
               
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button 
          
            type="submit"
            className="submit-button"
          />
        </div>

        <div className="signin-footer">
          <p>Don't have an account? <a href="#" className="link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;