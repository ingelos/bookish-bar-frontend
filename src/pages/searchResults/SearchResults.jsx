import BookCard from "../../components/bookCard/BookCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function SearchResults() {

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const pageSize = 20;
    const searchInputRef = useRef(null);


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
                setQuery(query);
                setTotalPages(Math.min(Math.ceil(data.numFound / pageSize), 50));
        } catch (error) {
            if (axios.isCancel(error)) return;
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (query) {
            fetchSearchData(query, currentPage);
        }
    }, [query, currentPage]);

    async function handleSearch(newQuery) {
        setQuery(newQuery);
        setCurrentPage(1);
    }

    async function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }



    return (
        <section className="search-results outer-container">
            <div className="search-results inner-container">
                    <div className="search-container">
                        <div className="title-container">
                            <h3 className="subject-title titles">Results</h3>
                        </div>
                        {error && <p className="error-message">{error.message}</p>}
                        {loading && <p>Loading...</p>}
                        <SearchBar
                            query={query}
                            setQuery={setQuery}
                            searchInputRef={searchInputRef}
                            onSearch={handleSearch}
                        />
                    </div>
                        <div className="book-result-container">
                            {books.length > 0 && (
                                    books.map((book) => (
                                        <div className="book-container" key={book.key}>
                                            <BookCard
                                                title={book.title}
                                                author={book.author_name[0]}
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