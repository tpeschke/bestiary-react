import { jsx as _jsx } from "react/jsx-runtime";
import './LoadingIndicator.css';
export default function LoadingIndicator({ stylings, secondary = false }) {
    let classString = 'loader';
    secondary ? classString += ' secondaryColor' : '';
    !secondary ? stylings += ' full-height' : '';
    return (_jsx("div", { className: `${stylings} loading-indicator-shell`, children: _jsx("span", { className: classString }) }));
}
