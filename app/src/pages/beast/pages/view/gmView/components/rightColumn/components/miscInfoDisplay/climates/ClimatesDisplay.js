import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ClimateDisplay from './climateDisplay/ClimateDisplay';
import './ClimatesDisplay.css';
export default function ClimatesDisplay({ climates }) {
    return (_jsxs("div", { className: 'climates-display-shell', children: [_jsx("h3", { children: "Climates" }), _jsx("div", { children: climates.map((climate, index) => _jsx(ClimateDisplay, { climate: climate }, index)) })] }));
}
