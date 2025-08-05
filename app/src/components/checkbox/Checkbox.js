import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Checkbox.css';
export default function Checkbox({ onClick, label, tooltip }) {
    function handleShellClick(event) {
        event.stopPropagation();
        let checkbox = document.getElementById(`${label}`);
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
        onClick({
            ...event,
            stopPropagation: event.stopPropagation,
            target: { ...event.target, checked: checkbox.checked }
        });
    }
    return (_jsxs("div", { className: 'checkbox-shell', onClick: handleShellClick, "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: [_jsx("input", { type: "checkbox", id: `${label}`, onClick: event => onClick(event) }), _jsx("p", { children: label })] }));
}
