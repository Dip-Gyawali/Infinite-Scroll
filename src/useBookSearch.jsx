import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

export default function useBookSearch(query, pageNo) {

    useEffect(async () => {
        //cancel token generates a token to cancel api request which solves unnecessary api call

        const source = axios.CancelToken.source();
        // console.log(source.token);
        try {
            let res = await axios({
                method: "GET",
                url: "http://openlibrary.org/search.json",
                params: { q: query, page: pageNo },
                cancelToken: source.token
            })
            // console.log(res.cancelToken);
            console.log(res);
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log(e.message)
                return;
            }
        }

        return ()=>{
            source.cancel("cancelled");
        }
    }, [query, pageNo])
    return null;
}
