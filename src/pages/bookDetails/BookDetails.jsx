import "./BookDetails.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookDetailCard from "../../components/bookDetailCard/BookDetailCard.jsx";

function BookDetails() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { bookId} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAuthorName(authorKey) {
            try {
                const {data} = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`, {
                    signal: controller.signal,
                });
                return data.name || "Unknown author"
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Failed to fetch author name:", error)
                }
                return "Unknown author";
            }
        }

        async function fetchBookDetails() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`https://openlibrary.org/works/${bookId}.json`, {
                    signal: controller.signal,
                });
                let authorName = "Unknown author";
                if (data.authors && data.authors[0]?.author?.key) {
                    const authorKey = data.authors[0].author.key.replace("/authors/", "");
                    authorName = await fetchAuthorName(authorKey);
                }
                setBook({
                    ...data,
                    authorName,
                });
                console.log(data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Failed to fetch book details:", error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchBookDetails();

        return function cleanup() {
            controller.abort();
        }

    }, [bookId]);

    function getCoverUrl(book) {
        if (book.cover_id) {
            return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        }
        if (book.covers) {
            return `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
        }
        return null;
    }

    return (
        <section className="book-page outer-container">
            <div className="book-page inner-container">
                    <div className="book-detail-container">
                        {loading && <p className="loading-message">Loading...</p>}
                        {error && <p>{error.message}</p>}
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
        </section>

    )
}

export default BookDetails;
