import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
export default function BaseComplicationDisplay({ info }) {
    const { type } = info;
    return (_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("p", { children: type })] }));
}
