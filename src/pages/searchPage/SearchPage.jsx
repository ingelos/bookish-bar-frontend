import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/bookCard/BookCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function SearchPage() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pageSize = 20;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';


    useEffect(() => {
        if (query) {
            fetchSearchData(query, currentPage);
        }
    }, [query, currentPage]);

    async function fetchSearchData(query, pageNumber = 1) {
        if (!query) return;
        setError(null);
        setLoading(true);

        try {
            const {data} = await axios.get("http://localhost:8080/books/api/search", {
                params: { query: query, page: pageNumber, size: pageSize,},
            });

            setBooks(data);
            setTotalPages(50);
        } catch (error) {
            if (axios.isCancel(error)) return;
            console.error(error);
            setError("Failed to fetch books.");
        } finally {
            setLoading(false);
        }
    }

    async function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    async function handleSearch(newQuery) {
        if (!newQuery) return;
        setCurrentPage(1);
        navigate(`/search?query=${encodeURIComponent(newQuery)}`)
    }


    return (
        <section className="search-results outer-container">
            <div className="search-results inner-container">
                <div className="search-container">
                    <SearchBar
                        onSearch={handleSearch}
                        value={query}
                    />
                    {error && <p className="error-message">{error.message}</p>}

                </div>
                <div className="title-container">
                    {books.length > 0 && <h3 className="search-results-title">Search results:</h3>}
                    {loading && <p className="loading-message">Loading...</p>}
                    {!loading && books.length === 0 && <p>No books found for this query. Try something else.</p>}
                </div>
                <div className="book-result-container">
                    {!loading && (
                        books.map((book) => (
                            <BookCard key={book.openLibraryId} {...book} />
                        ))
                    )}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    )

}

export default SearchPage;