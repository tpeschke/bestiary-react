import { jsx as _jsx } from "react/jsx-runtime";
import './htmlDisplay.css';
export default function HTMLDisplay({ html }) {
    return _jsx("div", { className: "html-display-shell", dangerouslySetInnerHTML: { __html: html } });
}
