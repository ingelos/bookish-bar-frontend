import {FaStar} from 'react-icons/fa'
import {useState} from "react";
import axios from "axios";


function Rating({bookId, initialRating, token}) {
    const [rating, setRating] = useState(initialRating || 0);
    const [hover, setHover] = useState(null);
    const [error, setError] = useState(false);


    async function handleRating(newRating) {
        setError(false);
        setRating(newRating);

        try {
            const {data} = await axios.put("http://localhost:8080/lists/READ/books/{bookId}/rating", {
                    rating: newRating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setRating(data.rating);
        } catch (error) {
            console.error("Error updating rating:", error);
            setError(true);
        }
    }


    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type='radio'
                            name={`rating-${bookId}`}
                            value={currentRating}
                            onClick={() => handleRating(currentRating)}
                            style={{display: "none"}}
                        />
                        <FaStar
                            // className={index <= hoveredStars ? 'hovered-stars' : ''}
                            size={18}
                            color={currentRating <= (hover ?? rating) ? "#D4B983" : "#D9D9D9"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
            {error && <p className="error-message">Failed to update rating</p>}
        </div>
    )
}

export default Rating;