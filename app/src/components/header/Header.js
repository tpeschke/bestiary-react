import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './Header.css';
import logo from '../../assets/images/BonfireLogo.png';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './searchOptions/SearchOptions';
import Icon from '../icon/Icon';
import { signInURL, signOutURL } from '../../frontend-config';
export default function Header() {
    const userIsLoggedIn = useSelector(isUserLoggedOn);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'header-background', children: [_jsxs(Link, { to: "/", children: [_jsx("img", { src: logo }), _jsx("h1", { children: "Bonfire Bestiary" })] }), userIsLoggedIn ?
                        _jsx("a", { href: signOutURL, children: _jsxs("button", { className: 'transparent-white', children: [_jsx(Icon, { iconName: 'log-out', color: 'white', margin: 'right' }), "Log Out"] }) })
                        :
                            _jsx("a", { href: signInURL, children: _jsxs("button", { className: 'transparent-white', children: [_jsx(Icon, { iconName: 'log-in', color: 'white', margin: 'right' }), "Log In"] }) })] }), _jsx(SearchOptions, {})] }));
}
