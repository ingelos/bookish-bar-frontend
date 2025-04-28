import "./Home.css";

import {Link} from "react-router-dom";
import UseTrending from "../../hooks/useTrending.js";


function Home() {
    const { trending, error, loading } = UseTrending();
    const topTrending = trending.slice(0, 5);
    // const [trending, setTrending] = useState([]);
    // const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const CACHE_KEY = "trending_books";
    // const CACHE_DURATION = 24 * 60 * 60 * 1000;
    //
    // useEffect(() => {
    //     const controller = new AbortController();
    //
    //     async function fetchTrending() {
    //         setLoading(true);
    //         setError(null);
    //
    //         try {
    //             const cachedData = localStorage.getItem(CACHE_KEY);
    //             if (cachedData) {
    //                 const parsedData = JSON.parse(cachedData);
    //                 if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
    //                     setTrending(parsedData.data);
    //                     setLoading(false);
    //                     return;
    //                 }
    //             }
    //             const {data} = await axios.get(`https://openlibrary.org/trending/daily.json`, {
    //                 signal: controller.signal,
    //                 params: {limit: 5}
    //             });
    //             console.log(data.works);
    //             setTrending(data.works);
    //
    //             localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.works, timestamp: Date.now()}));
    //
    //         } catch (e) {
    //             if (axios.isCancel(e)) return;
    //             console.error(e);
    //             setError(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //
    //     fetchTrending();
    //
    //     return function cleanup() {
    //         controller.abort();
    //     }
    //
    // }, []);


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
                {/*<div className='"home-section inner-content-container'>*/}
                <div className="welcome-container">
                    <div className="intro-message">
                        <h2>Welcome to Bookish Bar!</h2>
                        <h2>The bar that serves books...</h2>
                    </div>
                    <div className="dictionary-bookish">
                        <h4><strong>bookish</strong> [ book-ish ]</h4>
                        <h4><em>adjective</em></h4>
                        <h4>1. (of a person or way of life) devoted to reading and studying</h4>
                    </div>
                </div>
                <div className="trending-container">
                    <div className="preview-trending-container">
                        <h2 className="list-title titles">Trending today</h2>
                        {loading && <p className="loading-message">Loading...</p>}
                        {error && <p>{error.message}</p>}
                        <ul className="preview-list">
                            {topTrending?.map((book) => (
                                <li key={book.key} className="trending-cover">
                                    <img
                                        src={getCoverUrl(book)}
                                        alt={`cover ${book.title}`} className='cover-img-home'/>
                                </li>
                            ))}
                        </ul>
                        <Link to='/trending'><h3 className='more-link'>More Trending...</h3></Link>
                    </div>
                </div>
                {/*</div>*/}
            </div>
        </section>
    )
}

export default Home;