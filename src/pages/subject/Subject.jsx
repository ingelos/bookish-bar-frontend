import "./Subject.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import BookCard from "../../components/bookCard/BookCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";

function Subject() {
    const {subject} = useParams();
    const displayTitle = subject.replace(/_/g, " ");
    const [books, setBooks] = useState([]);
    const [works, setWorks] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {

        async function fetchSubject() {
            setError(false);
            setLoading(true);

            try {
                const {data} = await axios.get(`https://openlibrary.org/subjects/${subject}.json`, {
                    params: {
                        offset: (currentPage - 1) * pageSize,
                        limit: pageSize,
                    }
                });
                setBooks(data.works);
                setWorks(data.work_count);
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error("Error: ", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchSubject();

    }, [subject, currentPage]);

    const totalPages = Math.min(Math.ceil(works / pageSize), 50);

    async function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <section className="subject-page outer-container">
            <div className="subject-page inner-container">
                <div className="result-pages-container">
                    <div className="subject-container">
                        <div className="title-container">
                            <h3 className="subject-title titles">{displayTitle}</h3>
                            {books.length > 0 && <p className="number-of-works">Total works: {works}</p>}
                        </div>
                        {error && <p className="error-message">{error.message}</p>}
                        {loading && <p>Loading...</p>}
                        <div className="book-result-container">
                            {books.length > 0 && (
                                books.map((book) => (
                                    <div className="book-container" key={book.key}>
                                        <BookCard
                                            title={book.title}
                                            author={book.authors && book.authors[0].name}
                                            published={`First published in: ${book.first_publish_year}`}
                                            cover={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                                            bookId={(book.key).replace("/works/", "")}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subject;