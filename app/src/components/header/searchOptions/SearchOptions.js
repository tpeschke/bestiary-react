import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './SearchOptions.css';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../icon/Icon';
import { useEffect, useState } from 'react';
import AdvancedSearch from './advancedSearch/AdvancedSearch';
import SearchStatusHook from '../../../hooks/SearchStatusHook';
export default function SearchOptions() {
    const { isOnSearch } = SearchStatusHook();
    const [timeoutID, setTimeoutID] = useState(null);
    const [queryParams, setQueryParams] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!isOnSearch) {
            clearInputs();
            clearSelects();
        }
    }, [isOnSearch]);
    useEffect(() => {
        handleOldStyleLinks();
    }, [location]);
    function handleOldStyleLinks() {
        const splitURL = location.pathname.split(';');
        if (splitURL.length > 1) {
            let queryParams = {};
            splitURL.forEach(urlSection => {
                const [param, value] = urlSection.split('=');
                if (value) {
                    queryParams[param] = value;
                }
            });
            navigate({
                pathname: '/search',
                search: createSearchParams(queryParams).toString()
            });
        }
    }
    function captureQueryArray(param, id, checked) {
        let currentArray = [];
        if (queryParams[param]) {
            currentArray = [...queryParams[param]];
        }
        if (checked) {
            currentArray.push(id);
        }
        else {
            const indexToRemove = currentArray.indexOf(id);
            currentArray.splice(indexToRemove, 1);
        }
        let newQueryParams = { ...queryParams };
        if (currentArray.length === 0) {
            delete newQueryParams[param];
        }
        else {
            newQueryParams[param] = currentArray;
        }
        debounceQuery(newQueryParams, param);
    }
    function captureQuery(param, value) {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        let newQueryParams = { ...queryParams };
        if (value === 'none' || value === '' || !value) {
            delete newQueryParams[param];
        }
        else {
            newQueryParams[param] = value;
        }
        debounceQuery(newQueryParams, param);
    }
    function debounceQuery(newQueryParams, param) {
        setQueryParams(newQueryParams);
        const newTimeoutID = setTimeout(() => {
            if (queryParams[param] !== newQueryParams[param]) {
                navigate({
                    pathname: '/search',
                    search: createSearchParams(newQueryParams).toString()
                });
            }
        }, 1000);
        setTimeoutID(newTimeoutID);
    }
    function clearInputs() {
        const inputs = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        inputs.forEach(input => input.checked = false);
    }
    function clearSelects() {
        const selects = document.getElementsByClassName('search-options-shell')[0].querySelectorAll('select');
        selects.forEach(input => input.value = 'none');
    }
    return (_jsx("div", { className: 'search-options-shell', children: _jsxs("span", { children: [_jsx(Icon, { iconName: 'magnifying-glass', margin: 'right', color: 'black' }), _jsx("input", { onChange: e => captureQuery('name', e.target.value), placeholder: 'Search by Name' }), _jsx(AdvancedSearch, { captureQuery: captureQuery, captureQueryArray: captureQueryArray })] }) }));
}
