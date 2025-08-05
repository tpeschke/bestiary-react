import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './SearchResults.css';
import SearchHooks from './SearchHooks';
import { useEffect } from 'react';
import ResultCard from './components/resultCard/ResultCard';
import SearchTopBar from './components/SearchTopBar/SearchTopBar';
export default function SearchResults({ setLoading }) {
    const { searchResults, navigateToRandomResult, sortingMethodInfo, sortingDirectionInfo } = SearchHooks();
    useEffect(() => {
        if (setLoading) {
            setLoading(!!searchResults);
        }
    }, [searchResults]);
    return (_jsx(_Fragment, { children: searchResults && searchResults?.length > 0 ? (_jsxs(_Fragment, { children: [_jsx(SearchTopBar, { searchResults: searchResults, navigateToRandomResult: navigateToRandomResult, sortingMethodInfo: sortingMethodInfo, sortingDirectionInfo: sortingDirectionInfo }), searchResults.map((result, index) => _jsx(ResultCard, { searchResult: result }, index))] })) : (_jsx("div", { className: 'result-info-shell no-results', children: _jsx("h2", { children: "No Results Found" }) })) }));
}
