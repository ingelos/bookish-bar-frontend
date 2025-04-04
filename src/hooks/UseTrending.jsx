import {useEffect, useState} from "react";
import axios from "axios";

function UseTrending(limit = 5, offset = 0) {

    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const CACHE_KEY = `trending_books_limit${limit}_offset${offset}`;
    // const CACHE_DURATION = 24 * 60 * 60 * 1000;

    useEffect(() => {
        const controller = new AbortController();

        async function fetchTrending() {
            setLoading(true);
            setError(null);

            try {
                // const cachedData = localStorage.getItem(CACHE_KEY);
                // if (cachedData) {
                //     const parsedData = JSON.parse(cachedData);
                //     if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
                //         setTrending(parsedData.data);
                //         setLoading(false);
                //         return;
                //     }
                // }
                const {data} = await axios.get(`https://openlibrary.org/trending/daily.json`, {
                    signal: controller.signal,
                    params: {limit, offset}
                });
                console.log("Trending books: ", data.works);
                setTrending(data.works);

                // localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.works, timestamp: Date.now()}));

            } catch (e) {
                if (axios.isCancel(e)) return;
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchTrending();

        return function cleanup() {
            controller.abort();
        }

    }, [limit, offset]);

    return {trending, loading, error}
}

export default UseTrending;