import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
export default function LostComplicationDisplay({ info }) {
    const { type, distance } = info;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("p", { children: type })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Distance" }), _jsx("p", { children: distance })] })] }));
}
