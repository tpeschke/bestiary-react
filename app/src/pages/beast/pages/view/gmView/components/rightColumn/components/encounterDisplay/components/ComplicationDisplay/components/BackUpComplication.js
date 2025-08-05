import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
import { beastPage } from '../../../../../../../../../../../../frontend-config';
export default function BackUpComplicationDisplay({ info }) {
    const { name, id, time, type } = info;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("p", { children: type })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Time" }), _jsx("p", { children: time })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Back Up" }), _jsx("a", { href: beastPage + id, target: '_blank', children: _jsx("p", { children: name }) })] })] }));
}
