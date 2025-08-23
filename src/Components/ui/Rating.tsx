
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import './Rating.css';

const Rating = ({ rating=0}: { rating: number }) => {
    
    const stars = [];
    const maxRating = 5;

    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            // Full star
            stars.push(
                <FaStar
                    key={i}
                    className="star star-filled"
                />
            );
        } else if (i - 0.5 <= rating) {
            // Half star
            stars.push(
                <FaStarHalf
                    key={i}
                    className="star star-half"
                />
            );
        } else {
            // Empty star
            stars.push(
                <FaRegStar
                    key={i}
                    className="star star-empty"
                />
            );
        }
    }

    return (
        <div className="rating-container">
            <div className="stars-wrapper">
                {stars}
            </div>
            <span className="rating-text">({rating.toFixed(1)})</span>
        </div>
    );
};

export default Rating;