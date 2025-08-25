// NotFound.jsx

import './NotFound404.css';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-code">
          <span className="four">4</span>
          <span className="zero">0</span>
          <span className="four">4</span>
        </div>
        
        <div className="error-message">
          <h1>Oops! Page Not Found</h1>
          <p>The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
        
        <div className="error-actions">
          <Link to="/" className="home-btn">
            <i className="icon-home"></i>
            Go Back Home
          </Link>
          <button onClick={() => window.history.back()} className="back-btn">
            Go Back
          </button>
        </div>
        
        <div className="error-illustration">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

