import { useState } from 'react';
import { 
  FaStar, 
  FaRegStar, 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart,
  FaBolt,
  FaShippingFast 
} from 'react-icons/fa';
import './SimilarProduct.css';
import Rating from './Rating';

const SimilarProduct = ({product}) => {

  const [isWishlist, setIsWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate discounted price
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  // Generate star rating
  const generateStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="#ffc107" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" color="#ffc107" style={{ opacity: 0.5 }} />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="#e2e8f0" />);
    }

    return stars;
  };

  // Determine stock status
  const getStockStatus = () => {
    if (product.stock === 0) {
      return { text: 'Out of Stock', class: 'out-of-stock' };
    } else if (product.stock <= 10) {
      return { text: `Only ${product.stock} left`, class: 'low-stock' };
    } else {
      return { text: 'In Stock', class: 'in-stock' };
    }
  };

  const stockStatus = getStockStatus();

  const handleAddToCart = () => {
    console.log('Added to cart:', product.id);
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product.id);
    // Add your buy now logic here
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    console.log('Wishlist toggled:', product.id);
  };

  // Cycle through images on hover (optional enhancement)
  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div className="product-card">
      <div 
        className="product-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={product.images[currentImageIndex] || product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        
        <div className={`stock-badge ${stockStatus.class}`}>
          {stockStatus.text}
        </div>

        <button 
          className={`wishlist-btn ${isWishlist ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
        >
          {isWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <FaShoppingCart />
          
          </button>
        </div>
      </div>

      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <div className="product-brand">{product.brand}</div>
        
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="rating-container">
          <Rating rating={product.rating} />
        </div>

        <div className="price-container">
          <span className="current-price">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="original-price">
                ${product.price.toFixed(2)}
              </span>
              <span className="discount-amount">
                Save ${(product.price - discountedPrice).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="tags-container">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};



export default SimilarProduct;