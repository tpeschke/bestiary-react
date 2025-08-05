import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import sortResults from "./utilities/searchSorts";
import { searchURL } from "../../frontend-config";
export default function SearchHooks() {
    const [currentQueries, setCurrentQueries] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [sortingMethod, setSortingMethod] = useState('name');
    const [sortingDirection, setSortingDirection] = useState('dsc');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (searchParams.toString() && currentQueries !== searchParams.toString()) {
            setSearchResults(null);
            setCurrentQueries(searchParams.toString());
            axios.get(searchURL + '?' + searchParams.toString()).then(({ data }) => {
                const goDirectlyTo = searchParams.get('goDirectlyTo') === 'true';
                if (goDirectlyTo) {
                    navigateToRandomResult(data, navigate);
                }
                else {
                    sortAndSetResults(data);
                }
            });
        }
        else if (!searchParams.toString()) {
            sortAndSetResults([]);
        }
    }, [searchParams]);
    function sortAndSetResults(results) {
        const sortedResults = results.sort(sortResults(sortingMethod, sortingDirection));
        setSearchResults(sortedResults);
    }
    function navigateToRandomResult(searchResults, navigate) {
        if (searchResults.length > 0) {
            const randomResult = searchResults[Math.floor(Math.random() * searchResults.length)];
            navigate(`/beast/${randomResult.id}`);
        }
    }
    function changeMethod(newMethod) {
        if (searchResults) {
            setSortingDirection('dsc');
            setSortingMethod(newMethod);
            const sortedResults = searchResults.sort(sortResults(newMethod, 'dsc'));
            setSearchResults(sortedResults);
        }
    }
    function toggleDirection() {
        if (searchResults) {
            let newDirection = 'asc';
            if (sortingDirection === 'dsc') {
                setSortingDirection(newDirection);
            }
            else {
                newDirection = 'dsc';
                setSortingDirection(newDirection);
            }
            const sortedResults = searchResults.sort(sortResults(sortingMethod, newDirection));
            setSearchResults(sortedResults);
        }
    }
    return {
        searchResults,
        navigateToRandomResult,
        sortingMethodInfo: {
            sortingMethod,
            changeMethod
        },
        sortingDirectionInfo: {
            sortingDirection,
            toggleDirection
        }
    };
}
