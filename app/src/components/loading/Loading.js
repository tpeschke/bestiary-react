import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, useState } from 'react';
import './Loading.css';
import LoadingIndicator from './components/LoadingIndicator';
export default function Loading({ children, secondary = false }) {
    const [isLoading, setIsLoading] = useState(true);
    const setLoading = (showPageCondition) => {
        setIsLoading(!showPageCondition);
    };
    return (_jsxs(_Fragment, { children: [_jsx(LoadingIndicator, { stylings: isLoading ? '' : 'display-none', secondary: secondary }), _jsx("div", { className: isLoading ? 'display-none' : '', children: cloneElement(children, { setLoading }) })] }));
}
