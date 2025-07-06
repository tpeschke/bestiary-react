import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Return {
    searchResults: any[]
}

export default function SearchHooks(): Return {
    const [currentQueries, setCurrentQueries] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])

    const [searchParams] = useSearchParams();

    const navigate = useNavigate()
    
    useEffect(() => {
        
    }, [currentQueries]);

    function scrollToTop() {
        window.scrollTo(0, 0)
    }

    return {
        searchResults
    }
}