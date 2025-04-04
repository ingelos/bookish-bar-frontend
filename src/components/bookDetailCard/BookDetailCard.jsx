import "./BookDetailCard.css";
import NoCoverImage from "../../assets/icons/No_Cover.jpg";
import {Link} from "react-router-dom";

function BookDetailCard({ cover, title, authorName, authorId, description, firstSentence, firstPublished }) {
    const descriptionText = typeof description === "string" ? description : description?.value || "";
    const firstSentenceText = typeof firstSentence === "string" ? `First sentence: ${firstSentence}` : firstSentence?.value || "";

    function onImageError(e) {
        e.target.src = NoCoverImage;
        e.target.onerror = null;
    }

    return (
        <div className='book-detail-article'>
            <div className='book-cover-detail-container'>
                <img
                    src={cover ? cover : NoCoverImage}
                    alt={`${title} cover`}
                    onError={onImageError}
                    className='book-cover-detail'
                />
            </div>
            <div className='book-detailed-info'>
                <h2>{title || "No title available"}</h2>
                <h4 className='author-name'>
                    <Link to={`/authors/${authorId}`}>
                        {authorName || "No author available"}
                    </Link>
                </h4>
                <p className='detail-description'>{descriptionText}</p>
                <p>{firstSentenceText}</p>
                <p>{firstPublished ? `First published in ${firstPublished}` : ""}</p>
            </div>
        </div>
    )
}

export default BookDetailCard;