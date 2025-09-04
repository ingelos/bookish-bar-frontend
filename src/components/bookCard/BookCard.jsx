import "./BookCard.css";
import {Link} from "react-router-dom";
import NoCoverImage from "../../assets/icons/No_Cover.jpg";

function BookCard({ book }) {

    function onImageError(e) {
        e.target.src = NoCoverImage;
        e.target.onerror = null;
    }

    return (
        <div className="book-card">
            <img
                src={book.coverUrl || NoCoverImage}
                alt={`${book.title} cover`}
                onError={onImageError}
                className='book-cover'
            />
            <div className="book-info">
                <h3>
                    <Link to={`/books/${book.openLibraryId}`}>
                        {book.title || "No title available"}
                    </Link>
                </h3>
                <h4>
                    {book.authors && book.authors.length > 0 ? book.authors.join(", ") : "Unknown author"}
                </h4>
                <p>{book.publishedYear ? `First published in ${book.publishedYear}` : "Unknown year"}</p>
            </div>
        </div>
    )
}

export default BookCard;