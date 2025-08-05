import { jsx as _jsx } from "react/jsx-runtime";
import './VariantDisplay.css';
import { Link } from 'react-router-dom';
export default function VariantDisplay({ variantInfo }) {
    const { name, variantid } = variantInfo;
    return (_jsx(Link, { to: `/beast/${variantid}`, children: _jsx("button", { className: 'variant-display', children: name }) }));
}
