
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTruck, FaShieldAlt, FaUndoAlt } from 'react-icons/fa';
import "./Footer.css"
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' >
      

      <div className="footer-container">
        {/* Features Section */}
        <div className="features-grid">
          <div className="feature-item">
            <FaTruck className="feature-icon" size={24} />
            <div className="feature-text">
              <h4>Free Shipping</h4>
              <p>On orders over $100</p>
            </div>
          </div>
          <div className="feature-item">
            <FaShieldAlt className="feature-icon" size={24} />
            <div className="feature-text">
              <h4>Secure Payment</h4>
              <p>100% secure transactions</p>
            </div>
          </div>
          <div className="feature-item">
            <FaUndoAlt className="feature-icon" size={24} />
            <div className="feature-text">
              <h4>Easy Returns</h4>
              <p>30-day return policy</p>
            </div>
          </div>
          <div className="feature-item">
            <FaPhone className="feature-icon" size={24} />
            <div className="feature-text">
              <h4>24/7 Support</h4>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3>About ShopEase</h3>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem', 
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              Your trusted online marketplace for quality products at unbeatable prices. 
              We're committed to delivering exceptional shopping experiences.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" className="footer-link">Shop All</a></li>
              <li><a href="#" className="footer-link">New Arrivals</a></li>
              <li><a href="#" className="footer-link">Best Sellers</a></li>
              <li><a href="#" className="footer-link">Sale Items</a></li>
              <li><a href="#" className="footer-link">Gift Cards</a></li>
              <li><a href="#" className="footer-link">Track Your Order</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Shipping Info</a></li>
              <li><a href="#" className="footer-link">Returns & Exchanges</a></li>
              <li><a href="#" className="footer-link">Size Guide</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <ul>
              <li>
                <a href="tel:+1234567890" className="footer-link">
                  <FaPhone size={16} />
                  +1 (234) 567-8900
                </a>
              </li>
              <li>
                <a href="mailto:support@shopease.com" className="footer-link">
                  <FaEnvelope size={16} />
                  support@shopease.com
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <FaMapMarkerAlt size={16} />
                  123 Commerce St, City, State 12345
                </a>
              </li>
            </ul>
            
            <h3 style={{ marginTop: '2rem' }}>Newsletter</h3>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem', 
              marginBottom: '1rem' 
            }}>
              Subscribe for exclusive deals and updates
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} ShopEase. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;