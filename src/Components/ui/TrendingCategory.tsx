
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Product from '../Shop/Products/product';
import './TrendingCategory.css';
import { Link } from 'react-router';


const TrendingCategory = ({TrendList}:{TrendList:any}) => {

  let category=TrendList.category
  const scrollContainer = (direction:string) => {
    const container = document.getElementById(`category-${category}`);
    const scrollAmount = 320; // Width of one card + gap
    
    if (direction === 'left') {
      container?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewAll = () => {
    // Navigate to category page
    console.log(`Navigate to ${category} category page`);
    // window.location.href = `/category/${category}`;
  };






  















 

  return (
    <section className="trending-category">
      <div className="category-header">
        <div className="category-title-section">
          <h2 className="category-title">{category}</h2>
          <p className="category-subtitle">Trending now in {category}</p>
        </div>
        <button className="view-all-btn" onClick={handleViewAll}>
          View All
          <FaArrowRight className="view-all-icon" />
        </button>
      </div>

      <div className="products-carousel-container">
        <button 
          className="carousel-nav-btn left"
          onClick={() => scrollContainer('left')}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        <div 
          className="products-carousel"
          id={`category-${category}`}
        >
          {TrendList.products.map((product:any) => (
            <div key={product.id} className="carousel-item">
              <Link to={`/shop/${category}/${product.name}/${product.id}`}>
                <Product product={product} />
              </Link>
            </div>
          ))}
        </div>

        <button 
          className="carousel-nav-btn right"
          onClick={() => scrollContainer('right')}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>

     
    </section>
  );
};

export default TrendingCategory;