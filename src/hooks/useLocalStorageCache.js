import {useState} from "react";

function useLocalStorageCache(key, expiryTimeMs) {
    const getCachedData = () => {
        const data = localStorage.getItem(key);
        const timestamp = localStorage.getItem(`${key}TimeStamp`);

        if (data && timestamp && (Date.now() - parseInt(timestamp)) < expiryTimeMs) {
            return JSON.parse(data);
        }
        return null;
    };

    const [cachedData, setCachedDate] = useState(getCachedData());

    const updateCache = (newData) => {
        localStorage.setItem(key, JSON.stringify(newData));
        localStorage.setItem(`${key}TimeStamp`, Date.now().toString());
        setCachedDate(newData);
    }

    return [cachedData, updateCache];
}

export default useLocalStorageCache;