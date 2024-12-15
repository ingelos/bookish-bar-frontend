import "./BookCard.css";
import {Link} from "react-router-dom";
import NoCoverImage from "../../assets/icons/No_Cover.jpg";

function BookCard({title, bookId, authorId, author, published, cover}) {

    function onImageError(e) {
        e.target.src = NoCoverImage;
    }

    return (
        <article className="book-card">
            <img
                src={cover ? cover : NoCoverImage}
                alt={`${title} cover`}
                onError={onImageError}
                className='book-cover'
            />
            <div className="book-info">
                <h3><Link to={`/books/${bookId}`}>{title ? title : "No title available"}</Link></h3>
                <h4><Link to={`/authors/${authorId}`}>{author ? author : "No author available"}</Link></h4>
                <p>{published ? published : "No publish date available"}</p>
            </div>
        </article>
    )
}

export default BookCard;