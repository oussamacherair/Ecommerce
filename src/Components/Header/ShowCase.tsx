
import "./ShowCase.css"
import { Link } from 'react-router'

const ShowCase = () => {
  return (
    <div className="showcase_container">
      <div className="hero-content">
        <h1>Summer Sale: 50% Off</h1>
        <p>Limited time only. Shop the collection now.</p>
        <button className="cta-button">
          <Link to="/shop">
            Shop Now
          </Link>
        </button>
      </div>
    </div>
  )
}

export default ShowCase