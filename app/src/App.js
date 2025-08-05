import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import Header from './components/header/Header';
import { accessURL } from './frontend-config';
import { setUser, isUserLoggedOn } from './redux/slices/userSlice';
import Footer from './components/footer/Footer';
import AllRoutes from './routing/AllRoutes';
export default function App() {
    const userIsLoggedIn = useSelector(isUserLoggedOn);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userIsLoggedIn) {
            axios.get(accessURL + '/isLoggedIn').then(({ data }) => {
                dispatch(setUser(data));
            });
        }
    }, []);
    return (_jsx("div", { className: 'background', children: _jsxs("div", { className: 'container', children: [_jsx(Header, {}), _jsx(AllRoutes, {}), _jsx(Footer, {}), _jsx(ToastContainer, { transition: Slide, stacked: true, theme: "colored", closeOnClick: true }), _jsx(Tooltip, { id: "my-tooltip", place: "bottom" })] }) }));
}
