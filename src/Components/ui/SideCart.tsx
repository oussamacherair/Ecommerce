import { useState } from 'react';
import { 
  FaShoppingCart, 
  FaBolt, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaGift,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';
import './SideCart.css';

const SideCart = () => {            
  const [quantity, setQuantity] = useState(1);
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  return (
    <div className="buybox-container">
      {/* Price Section */}
      <div className="price-section">
        <span className="currency">$</span>
        <span className="price-whole">12</span>
        <span className="price-decimal">.</span>
        <span className="price-fraction">97</span>
      </div>

      {/* Shipping Info */}
      <div className="shipping-section">
        <span className="shipping-cost">$108.77 Shipping & Import Charges to Algeria</span>
        <button 
          className="details-btn"
          onClick={() => setShowShippingDetails(!showShippingDetails)}
        >
          Details <FaInfoCircle className="info-icon" />
        </button>
        
        {showShippingDetails && (
          <div className="shipping-details">
            <h3>Shipping & Fee Details</h3>
            <div className="fee-breakdown">
              <div className="fee-item">
                <span>Price</span>
                <span>$12.97</span>
              </div>
              <div className="fee-item">
                <span>AmazonGlobal Shipping</span>
                <span>$40.29</span>
              </div>
              <div className="fee-item">
                <span>Estimated Import Charges</span>
                <span>$68.48</span>
              </div>
              <hr />
              <div className="fee-item total">
                <span>Total</span>
                <span>$121.74</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="delivery-section">
        <div className="delivery-date">
          Delivery <strong>Sunday, August 31</strong>
        </div>
        <div className="delivery-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>Deliver to Algeria</span>
        </div>
      </div>

      {/* Availability */}
      <div className="availability-section">
        <span className="stock-info">Only 7 left in stock - order soon.</span>
      </div>

      {/* Quantity Selection */}
      <div className="quantity-section">
        <label htmlFor="quantity">Quantity:</label>
        <select 
          id="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="quantity-select"
        >
          {[1,2,3,4,5,6,7].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="add-to-cart-btn">
          <FaShoppingCart className="btn-icon" />
          Add to Cart
        </button>
        <button className="buy-now-btn">
          <FaBolt className="btn-icon" />
          Buy Now
        </button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <div className="detail-item">
          <span className="detail-label">Ships from</span>
          <span className="detail-value">Amazon</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sold by</span>
          <span className="detail-value">
            <a href="#" className="seller-link">Treefty</a>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Returns</span>
          <span className="detail-value">
            <a href="#" className="return-link">30-day refund / replacement</a>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Gift options</span>
          <span className="detail-value">
            <a href="#" className="gift-link">
              <FaGift className="gift-icon" />
              Available at checkout
            </a>
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Payment</span>
          <span className="detail-value">
            <FaShieldAlt className="secure-icon" />
            Secure transaction
          </span>
        </div>
      </div>

      {/* Wishlist Button */}
      <div className="wishlist-section">
        <button className="wishlist-btn">
          <FaHeart className="heart-icon" />
          Add to List
        </button>
      </div>
    </div>
  );
};

export default SideCart;