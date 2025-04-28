import UseTrending from "../../hooks/useTrending.js";
import "./Trending.css";
import {Link} from "react-router-dom";

function Trending() {
    const {trending, loading, error} = UseTrending();

    function getCoverUrl(book) {
        if (book.cover_edition_key) {
            return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
        }
        if (book.cover_i) {
            return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        return null;
    }


    return (
        <section className="home-section outer-container">
            <div className="home-section inner-container">
                <div className="trending-container">
                    <h2 className="list-title titles">Trending today</h2>
                    {loading && <p className="loading-message">Loading...</p>}
                    {error && <p>{error.message}</p>}
                    <div className="book-result-container">
                        {trending?.map((book) => (
                            <div key={book.key} className="book-container">
                                <div className="book-card trending-card">
                                    <img
                                        src={getCoverUrl(book)}
                                        alt={`cover ${book.title}`} className='book-cover'/>
                                    <div id="trending-info">
                                        <Link to={`/books/${(book.key).replace("/works/", "")}`}>
                                            <h3>{book.title}</h3>
                                        </Link>
                                        <p>{book.author_name}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trending;