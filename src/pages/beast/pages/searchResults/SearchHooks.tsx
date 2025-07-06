import axios from "axios";

import { SearchResult } from '../../../../../common/interfaces/search'
import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import { searchURL } from "../../../../frontend-config";

export type NavigateToRandomResultFunction = (searchResults: SearchResult[], navigate: NavigateFunction) => void

interface Return {
    searchResults: SearchResult[],
    navigateToRandomResult: NavigateToRandomResultFunction
}

export default function SearchHooks(): Return {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (currentQueries !== searchParams.toString()) {
            setSearchResults([])
            setCurrentQueries(searchParams.toString())

            axios.get(searchURL + '?' + searchParams.toString()).then(({ data }) => {
                const goDirectlyTo = searchParams.get('goDirectlyTo') === 'true'
                if (goDirectlyTo) {
                    navigateToRandomResult(data, navigate)
                } else {
                    setSearchResults(data)
                }
            })
        }
    }, [searchParams]);

    function navigateToRandomResult(searchResults: SearchResult[], navigate: NavigateFunction) {
        if (searchResults.length > 0) {
            const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
            navigate(`/beast/${randomResult.id}`)
        }
    }

    return {
        searchResults,
        navigateToRandomResult
    }
}