import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function useBookSearch(query, pageNo) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books, setBooks] = useState([]);
    const [more, setMore] = useState(false);

    useEffect(() => {
        setBooks([]);
    }, [query]);

    useEffect(() => {

         //cancel token generates a token to cancel api request which solves unnecessary api call
         
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get("http://openlibrary.org/search.json", {
                    params: { q: query, page: pageNo },
                    cancelToken: source.token
                });
                setBooks(prevBooks => {
                    return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])];
                });
                setMore(res.data.docs.length > 0);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.log("Request canceled:", e.message);
                } else {
                    setError(true);
                }
            }
            setLoading(false);
        };

        fetchData();

        return () => {
            source.cancel("cancelled");
        };
    }, [query, pageNo]);

    return { loading, error, books, more };
}
