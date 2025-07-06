import axios from "axios";

import { SearchResult } from '../../../../../common/interfaces/search'
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchURL } from "../../../../frontend-config";

interface Return {
    searchResults: SearchResult[]
}

export default function SearchHooks(): Return {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (currentQueries !== searchParams.toString()) {
            setSearchResults([])
            setCurrentQueries(searchParams.toString())

            axios.get(searchURL + '?' + searchParams.toString()).then(({data}) => {
                setSearchResults(data)
            })
        }
    }, [searchParams]);

    return {
        searchResults
    }
}