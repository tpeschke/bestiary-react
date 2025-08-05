import { jsx as _jsx } from "react/jsx-runtime";
import './LocationDisplay.css';
export default function LocationDisplay({ locationInfo }) {
    const { location, link } = locationInfo;
    return (_jsx("a", { href: link, target: '_blank', children: _jsx("button", { className: 'location-display', children: location }) }));
}
