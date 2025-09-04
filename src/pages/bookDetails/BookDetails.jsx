import "./BookDetails.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookDetailCard from "../../components/bookDetailCard/BookDetailCard.jsx";

function BookDetails() {
    const {openLibraryId} = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!openLibraryId) return;

        const controller = new AbortController();

        async function fetchBookDetails() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`http://localhost:8080/api/books/${openLibraryId}`, {
                    signal: controller.signal
                });
                setBook(data);
            } catch (error) {
                if (!axios.isCancel(error)) return
                console.error("Failed to fetch book details:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchBookDetails();

        return () => controller.abort();
    }, [openLibraryId]);


return (
    <section className="book-page outer-container">
        <div className="book-page inner-container">
            <div className="book-detail-container">
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p>{error.message}</p>}
                <div className="book-details">
                    {Object.keys(book).length > 0 &&
                        <BookDetailCard
                            title={book.title}
                            authorName={book.authorName}
                            cover={getCoverUrl(book)}
                            description={book.description}
                            firstSentence={book.first_sentence}
                            firstPublished={book.first_publish_date}
                            authorId={book.authors?.[0]?.author?.key.replace('/authors/', "") || ""}
                        />
                    }
                </div>
            </div>
        </div>
    </section>

)
}

export default BookDetails;
