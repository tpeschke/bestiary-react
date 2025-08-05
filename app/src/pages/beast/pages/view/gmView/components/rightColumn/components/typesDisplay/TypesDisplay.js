import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './TypesDisplay.css';
import Drawers from "../../../../../../../../../components/drawers/Drawers";
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import { Link } from 'react-router-dom';
export default function TypesDisplay({ types }) {
    const formatedTypes = types.map(type => formatType(type));
    return (_jsx(_Fragment, { children: types.length > 0 &&
            _jsxs("div", { className: 'types-display-shell', children: [_jsx("h2", { className: 'border', children: "Types" }), _jsx(Drawers, { drawerInnards: formatedTypes })] }) }));
}
function formatType({ type, description, typeid }) {
    return {
        label: type,
        innards: (_jsxs("div", { className: 'type-description-shell', children: [_jsx(HTMLDisplay, { html: description }), _jsx(Link, { to: `/search?types=${typeid}`, children: _jsxs("button", { children: ["See More ", type, "s"] }) })] }))
    };
}
