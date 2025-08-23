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
import { Link, useParams } from 'react-router';
import { type ResponseState } from '../../../types/types';

import SimilarProduct from '../../ui/SimilarProduct';
import { type Review } from '../../../types/types';
import { type Dimensions } from '../../../types/types';
import Rating from '../../ui/Rating';

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
      const result = await axios.get(`/api/product/${category}/${productId}`);

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

  const { data: product,similarProducts } = productData?.data;
  

  if (!product) {
    return (
      <div className='container'>
        <div className='products-container'>
          <h1>Product not found</h1>
        </div>
      </div>
    );
  }

  
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

 console.log(product.rating,product)


  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'next' && currentImageIndex < product.images.length - 1) {
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
                src={product.images[currentImageIndex]} 
                alt={product.title} 
                className="main-image"
              />
              
              {product.images.length > 1 && (
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
                    disabled={currentImageIndex === product.images.length - 1}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
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
              <span className="brand">{product.brand}</span>
              <h1 className="product-title">{product.title}</h1>

              <div className="rating-section">
                <Rating rating={product.rating} />

              </div>

              <div className="price-section">
                <span className="current-price">${discountedPrice.toFixed(2)}</span>
                <span className="original-price">${product.price.toFixed(2)}</span>
                <span className="discount">-{product.discountPercentage.toFixed(0)}%</span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <FaShippingFast className="feature-icon" />
                <span>{product.shippingInformation}</span>
              </div>
              <div className="feature">
                <FaShieldAlt className="feature-icon" />
                <span>{product.warrantyInformation}</span>
              </div>
              <div className="feature">
                <FaBox className="feature-icon" />
                <span>{product.stock} in stock</span>
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
                  disabled={quantity >= product.stock}
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
                  <span>{product.sku}</span>
                </div>
                <div className="detail">
                  <span className="label">Weight:</span>
                  <span>{product.weight}g</span>
                </div>
                <div className="detail">
                  <span className="label">Dimensions:</span>
                  <span>
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Return Policy:</span>
                  <span>{product.returnPolicy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <div key={index} className="review">
                <div className="review-header">
                  <div className="review-rating">
                    <Rating rating={review.rating} />

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
            {similarProducts.map((product) => (
              <Link to={`/shop/${product.category}/${product.title}/${product.id}`}>
                <SimilarProduct key={product.id} product={product} />
              </Link>
            ))} 

          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ProductPage;