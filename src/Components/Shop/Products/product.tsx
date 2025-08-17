
import {  FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import './product.css';
import type { ProductType } from '../../../types/types';
import Rating from '../../ui/Rating';

const Product = ({ product }: {product:ProductType}) => {
  // Function to render star rating
  

  // Calculate discounted price
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="product-image"
          loading='lazy'
        />
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{product.discountPercentage.toFixed(0)}%
          </div>
        )}
        <div className="product-actions">
          <button className="action-btn wishlist-btn" title="Add to Wishlist">
            <FaHeart />
          </button>
          <button className="action-btn view-btn" title="Quick View">
            <FaEye />
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <div className="stars">
            
          </div>
          <Rating rating={product.rating}/>
        </div>
        
        <div className="product-pricing">
          <span className="current-price">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="original-price">${product.price}</span>
          )}
        </div>
        
        <div className="product-meta">
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        
        <button 
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          disabled={product.stock === 0}
        >
          <FaShoppingCart />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default Product;