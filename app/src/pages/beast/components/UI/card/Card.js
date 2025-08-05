import { jsx as _jsx } from "react/jsx-runtime";
import "./Card.css";
export default function Card({ children }) {
    return (_jsx("div", { className: "card-shell", children: children }));
}
