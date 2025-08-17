import React, { useEffect, useState } from 'react';
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShippingFast,
  FaShieldAlt,
  FaBox,
  FaHeart,
  FaShare,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './ProductPage.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { type ResponseState } from '../../../types/types';

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productData, setProduct] = useState<ResponseState>({ 
    data: null, 
    loading: true, 
    error: null 
  });
  const { category, productname, productId } = useParams();

  const getProduct = async () => {
    try {
      const result = await axios.get(`/api/product/${productId}`);
      setProduct({
        data: result.data,
        loading: false,
        error: null,
        success: true,
      });
    } catch (error) {
      setProduct({
        data: null,
        loading: false,
        error: "Failed to fetch product, Please check network",
        success: false,
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  const { loading, error } = productData;

  if (loading) {
    return (
      <div className='container'>
        <div className='products-container'>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <div className='products-container'>
          <h1>{error}</h1>
        </div>
      </div>
    );
  }

  const { data: product } = productData?.data;
  
  if (!product) {
    return (
      <div className='container'>
        <div className='products-container'>
          <h1>Product not found</h1>
        </div>
      </div>
    );
  }

  const productInfo = product;
  const discountedPrice = productInfo.price - (productInfo.price * productInfo.discountPercentage / 100);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star filled" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }

    return stars;
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productInfo.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'next' && currentImageIndex < productInfo.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-page">
      <div className="container">
        {/* Product Main Section */}
        <div className="product-main">
          <div className="product-image">
            <div className="image-gallery">
              <img 
                src={productInfo.images[currentImageIndex]} 
                alt={productInfo.title} 
                className="main-image"
              />
              
              {productInfo.images.length > 1 && (
                <>
                  <button
                    className="image-navigation prev-btn"
                    onClick={() => handleImageNavigation('prev')}
                    disabled={currentImageIndex === 0}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="image-navigation next-btn"
                    onClick={() => handleImageNavigation('next')}
                    disabled={currentImageIndex === productInfo.images.length - 1}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {productInfo.images.length > 1 && (
              <div className="thumbnail-container">
                {productInfo.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${productInfo.title} ${index + 1}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            )}

            <div className="product-actions">
              <button className="action-btn">
                <FaHeart />
              </button>
              <button className="action-btn">
                <FaShare />
              </button>
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <span className="brand">{productInfo.brand}</span>
              <h1 className="product-title">{productInfo.title}</h1>

              <div className="rating-section">
                <div className="stars">
                  {renderStars(productInfo.rating)}
                </div>
                <span className="rating-text">
                  ({productInfo.rating}) • {productInfo.reviews.length} reviews
                </span>
              </div>

              <div className="price-section">
                <span className="current-price">${discountedPrice.toFixed(2)}</span>
                <span className="original-price">${productInfo.price.toFixed(2)}</span>
                <span className="discount">-{productInfo.discountPercentage.toFixed(0)}%</span>
              </div>
            </div>

            <div className="product-description">
              <p>{productInfo.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <FaShippingFast className="feature-icon" />
                <span>{productInfo.shippingInformation}</span>
              </div>
              <div className="feature">
                <FaShieldAlt className="feature-icon" />
                <span>{productInfo.warrantyInformation}</span>
              </div>
              <div className="feature">
                <FaBox className="feature-icon" />
                <span>{productInfo.stock} in stock</span>
              </div>
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= productInfo.stock}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="purchase-buttons">
              <button className="btn btn-secondary">
                <FaShoppingCart />
                Add to Cart
              </button>
              <button className="btn btn-primary">
                Buy Now
              </button>
            </div>

            <div className="product-details">
              <h3>Product Details</h3>
              <div className="details-grid">
                <div className="detail">
                  <span className="label">SKU:</span>
                  <span>{productInfo.sku}</span>
                </div>
                <div className="detail">
                  <span className="label">Weight:</span>
                  <span>{productInfo.weight}g</span>
                </div>
                <div className="detail">
                  <span className="label">Dimensions:</span>
                  <span>
                    {productInfo.dimensions.width} × {productInfo.dimensions.height} × {productInfo.dimensions.depth} cm
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Return Policy:</span>
                  <span>{productInfo.returnPolicy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-list">
            {productInfo.reviews.map((review, index) => (
              <div key={index} className="review">
                <div className="review-header">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <span className="reviewer-name">{review.reviewerName}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Section - Ready for implementation */}
        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="similar-products-grid">
            {/* This section is ready for when you implement similar products */}
            <div className="similar-product-card" style={{opacity: 0.5}}>
              <div className="similar-product-image">
                <div style={{
                  height: '100%',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  Similar products will appear here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;