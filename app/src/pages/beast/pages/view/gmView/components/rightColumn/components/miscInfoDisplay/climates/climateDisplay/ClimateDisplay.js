import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import './ClimateDisplay.css';
export default function ClimateDisplay({ climate }) {
    const { climate: climateName, code, examples, climateid } = climate;
    let tooltip = examples;
    code ? tooltip += `\nKöppen Climate Classification:  ${code}` : null;
    tooltip += '\nClick to Search for other monsters in this climate.';
    return (_jsx(Link, { to: `/search?climate=${climateid}`, children: _jsx("button", { className: 'climate-display', "data-tooltip-id": "my-tooltip", "data-tooltip-content": tooltip, children: climateName }) }));
}
