import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './doubleColumn.css';
export default function DoubleColumn({ LeftColumn, RightColumn }) {
    return (_jsxs("div", { className: 'column-shell', children: [_jsx("div", { className: "left", children: LeftColumn }), _jsx("div", { className: "right", children: RightColumn })] }));
}
