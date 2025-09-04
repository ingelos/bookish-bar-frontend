import "./BookDetailCard.css";
import NoCoverImage from "../../assets/icons/No_Cover.jpg";
import {Link} from "react-router-dom";

function BookDetailCard({ book }) {
    const descriptionText = book.description || "";
    const firstSentenceText = book.first_sentence ? `First sentence: ${book.first_sentence}` : "";
    const firstPublishedYear = book.first_publish_date ? `First published in ${book.first_publish_date}` : "";

    function onImageError(e) {
        e.target.src = NoCoverImage;
        e.target.onerror = null;
    }

    return (
        <div className='book-detail-article'>
            <div className='book-cover-detail-container'>
                <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    onError={onImageError}
                />
            </div>
            <div className='book-detailed-info'>
                <h2>{book.title}</h2>
                <h4 className='author-name'>
                    {book.authors?.map((author, index) => (
                        <span key={author.id}>
                            <Link to={`/authors/${author.id}`}>
                        {author.name}
                    </Link>
                            {index < book.authors.length - 1 ? ", " : ""}
                        </span>
                    )) || "Unknown Author"}
                </h4>
                <p className='detail-description'>{descriptionText}</p>
                <p>{firstSentenceText}</p>
                <p>{firstPublishedYear}</p>
            </div>
        </div>
    )
}

export default BookDetailCard;