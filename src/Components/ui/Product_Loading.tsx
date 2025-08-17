
import "./product-skeleton.css"

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton ">
      <div className="product-image-container-skeleton">
        <div className="product-image-skeleton"></div>
        <div className="product-actions-skeleton">
          <div className="action-btn-skeleton"></div>
          <div className="action-btn-skeleton"></div>
        </div>
      </div>
      
      <div className="product-info-skeleton">
        <div className="skeleton-line brand-skeleton"></div>
        <div className="skeleton-line title-skeleton"></div>
        <div className="skeleton-line description-skeleton"></div>
        
        <div className="product-rating-skeleton">
          <div className="stars-skeleton"></div>
          <div className="rating-text-skeleton"></div>
        </div>
        
        <div className="product-pricing-skeleton">
          <div className="current-price-skeleton"></div>
          <div className="original-price-skeleton"></div>
        </div>
        
        <div className="product-meta-skeleton">
          <div className="stock-status-skeleton"></div>
        </div>
        
        <div className="add-to-cart-btn-skeleton"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton