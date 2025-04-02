import UseTrending from "../../hooks/UseTrending.jsx";
import "./Trending.css";

function Trending() {
    const {trending, loading, error} = UseTrending(50, 0);

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
                                        alt={`cover ${book.title}`} className='cover-img-home'/>
                                    <div>
                                        <h3>{book.title}</h3>
                                        <p>{book.author_name}</p>
                                    </div>
                                </div>
                                {/*<BookCard*/}
                                {/*    bookId={(book.key).replace("/works/", "")}*/}
                                {/*    // authorId={book.author_key ? (Array.isArray(book.author_key) ? book.author_key[0] : book.author_key) : (book.authors ? (Array.isArray(book.authors) ? book.authors[0].key.replace("/authors/", "") : book.authors.key) : '')}*/}
                                {/*    cover={getCoverUrl(book)}*/}
                                {/*    title={book.title ? book.title : ''}*/}
                                {/*    // author={book.author_name ? book.author_name[0] : ''}*/}
                                {/*    authors={book.author_name || "Unknown author"}*/}
                                {/*    authorIds={Array.isArray(book.authors) ? book.authors.map(author => {*/}
                                {/*        const key = author.key || "";*/}
                                {/*        return key.replace("/authors/", "");*/}
                                {/*    }) : []}*/}
                                {/*    year={book.first_publish_year ? `First published in: ${book.first_publish_year}` : ''}*/}
                                {/*/>*/}
                            </div>
                            //     <div key={book.key} className="book-container">
                            // <img
                            //     src={getCoverUrl(book)}
                            //             alt={`cover ${book.title}`} className='cover-img-home'/>
                            //     </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trending;