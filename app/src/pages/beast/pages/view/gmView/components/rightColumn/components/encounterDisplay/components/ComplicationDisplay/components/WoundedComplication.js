import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
export default function WoundedComplicationDisplay({ info }) {
    const { type, amount, byWhom } = info;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("p", { children: type })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Amount" }), _jsx("p", { children: amount })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "By" }), _jsx("p", { children: byWhom.name })] })] }));
}
