import "./BookCard.css";
import {Link} from "react-router-dom";
import NoCoverImage from "../../assets/icons/No_Cover.jpg";

function BookCard({title, bookId, authors, authorIds, published, cover}) {

    function onImageError(e) {
        e.target.src = NoCoverImage;
        e.target.onerror = null;
    }

    return (
        <div className="book-card">
            <img
                src={cover ? cover : NoCoverImage}
                alt={`${title} cover`}
                onError={onImageError}
                className='book-cover'
            />
            <div className="book-info">
                <h3>
                    <Link to={`/books/${bookId}`}>
                        {title || "No title available"}
                    </Link>
                </h3>
                <h4>
                    {authors && authors.length > 0 && authorIds && authorIds.length > 0 ? (
                        authors.map((author, index) => (
                                <span key={authorIds[index]}>
                                <Link to={`/authors/${authorIds[index]}`}>
                                    {author}
                                </Link>
                                    {index < authors.length - 1 && ", "}
                            </span>
                        ))
                    ) : (
                        <span>No author available</span>
                    )}
                </h4>
                <p>{published ? `First published in ${published}` : "Unknown year"}</p>
            </div>
        </div>
    )
}

export default BookCard;