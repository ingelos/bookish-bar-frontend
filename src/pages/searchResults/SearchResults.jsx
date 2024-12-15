import BookCard from "../../components/bookCard/BookCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import {useEffect,  useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";

function SearchResults() {
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
            console.log("Fetching data");
        }
    }, [currentPage, query]);

    async function fetchSearchData(query, pageNumber = 1) {
        setError(null);
        setLoading(true);

        try {
            const {data} = await axios.get(`https://openlibrary.org/search.json`, {
                params: {
                    q: query,
                    limit: pageSize,
                    offset: (pageNumber - 1) * pageSize,
                }
            });
                setBooks(data.docs);
                setTotalPages(Math.min(Math.ceil(data.numFound / pageSize), 50));
        } catch (error) {
            if (axios.isCancel(error)) return;
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(newQuery) {
        setCurrentPage(1);
        navigate(`/search?query=${encodeURIComponent(newQuery)}`)
    }

    async function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
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
                    {loading && <p>Loading...</p>}
                </div>
                <div className="title-container">
                    {books.length > 0 && <h3 className="search-results-title">Search results:</h3>}
                    {!loading && books.length === 0 && <p>No results for <strong>{query}</strong>. Try something else</p>}
                </div>
                <div className="book-result-container">
                    {books.length > 0 && (
                        books.map((book) => (
                            <div className="book-container" key={book.key}>
                                <BookCard
                                    title={book.title}
                                    author={book.author_name}
                                    published={`First published in: ${book.first_publish_year}`}
                                    cover={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
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
        </section>
    )

}

export default SearchResults;