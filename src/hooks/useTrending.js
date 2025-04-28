import {useEffect, useState} from "react";
import axios from "axios";
import useLocalStorageCache from "./useLocalStorageCache.js";

function UseTrending(limit = 20, offset = 0) {
    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cachedTrending, setCachedTrending] = useLocalStorageCache('trendingBooks', 3600 * 1000);


    useEffect(() => {
        const controller = new AbortController();

        async function fetchTrending() {
            if (cachedTrending) {
                setTrending(cachedTrending);
                setLoading(false);
            } else {
                try {
                    setLoading(true);
                    setError(null);
                    const {data} = await axios.get(`https://openlibrary.org/trending/daily.json`, {
                        signal: controller.signal,
                        params: { limit, offset }
                    });
                    setTrending(data.works);
                    setCachedTrending(data.works);
                } catch (e) {
                    if (axios.isCancel(e)) return;
                    console.error(e);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            }

        }

        fetchTrending();


        return function cleanup() {
            controller.abort();
        }

    }, [limit, offset, cachedTrending, setCachedTrending]);

    return { trending, loading, error }
}

export default UseTrending;