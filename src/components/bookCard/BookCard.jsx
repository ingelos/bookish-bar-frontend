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
            />
            <div className="book-info">
                <h3><Link to={`/books/${book.openLibraryId}`}>{book.title}</Link>
                </h3>
                <p>{book.authors? book.authors.join(", ") : "Unknown author"}</p>
                {book.publishedYear && <p>${book.publishedYear}</p>}
            </div>
        </div>
    )
}

export default BookCard;