import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './CanEditButton.css';
export default function CanEditButton({ canEdit, beastID }) {
    return (_jsx("div", { className: "can-edit-button-shell", children: canEdit &&
            _jsx(Link, { to: `/beast/${beastID}/edit`, children: _jsx("button", { className: "orange", children: "Edit Monster" }) }) }));
}
