import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/bookCard/BookCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

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
        if (query || currentPage) {
            fetchSearchData(query, currentPage);
        }
    }, [currentPage, query]);

    async function fetchSearchData(query, pageNumber = 1) {
        if (!query) return;
        setError(null);
        setLoading(true);

        try {
            const {data} = await axios.get(`https://openlibrary.org/search.json?q=${query}`, {
                params: {
                    limit: pageSize,
                    offset: (pageNumber - 1) * pageSize,
                }
            });
            setBooks(data.docs);
            console.log(data.docs);

            setTotalPages(Math.min(Math.ceil(data.numFound / pageSize), 50));
        } catch (error) {
            if (axios.isCancel(error)) return;
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(newQuery) {
        if (!newQuery) return;
        setCurrentPage(1);
        navigate(`/search?query=${encodeURIComponent(newQuery)}`)
    }

    async function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    function getCoverUrl(book) {
        if (book.cover_edition_key) {
            return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-S.jpg`;
        }
        if (book.cover_i) {
            return `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`;
        }
        return null;
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
                    {books.length > 0 &&  <h3 className="search-results-title">Search results:</h3>}
                    {loading && <p className="loading-message">Loading...</p>}
                </div>
                <div className="book-result-container">
                    {books.length > 0 && (
                        books.map((book) => (
                            <div className="book-container" key={book.key}>
                                <BookCard
                                    title={book.title}
                                    authors={book.author_name}
                                    published={book.first_publish_year}
                                    cover={getCoverUrl(book)}
                                    bookId={(book.key).replace("/works/", "")}
                                    authorIds={book.author_key}
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