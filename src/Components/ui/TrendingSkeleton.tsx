
import './TrendingSkeleton.css'

const TrendingSkeleton = () => {
  return (
    <section className="trending-category-skeleton">
      <div className="category-header-skeleton">
        <div className="category-title-section-skeleton">
          <div className="category-title-skeleton skeleton-shimmer"></div>
          <div className="category-subtitle-skeleton skeleton-shimmer"></div>
        </div>
        <div className="view-all-btn-skeleton skeleton-shimmer"></div>
      </div>
      
      <div className="products-carousel-container-skeleton">
        <div className="carousel-nav-btn-skeleton left skeleton-shimmer"></div>
        
        <div className="products-carousel-skeleton">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="carousel-item-skeleton">
              <div className="product-skeleton">
                <div className="product-image-skeleton skeleton-shimmer"></div>
                <div className="product-info-skeleton">
                  <div className="product-title-skeleton skeleton-shimmer"></div>
                  <div className="product-price-skeleton skeleton-shimmer"></div>
                  <div className="product-rating-skeleton skeleton-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carousel-nav-btn-skeleton right skeleton-shimmer"></div>
      </div>
    </section>
  )
}

export default TrendingSkeleton