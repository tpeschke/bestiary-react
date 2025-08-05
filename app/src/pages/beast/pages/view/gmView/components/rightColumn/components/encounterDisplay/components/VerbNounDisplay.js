import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../EncounterDisplay.css';
export default function VerbNounDisplay({ verb, noun }) {
    return (_jsxs("div", { className: 'pair-shell', children: [_jsx("h3", { children: "Verb - Noun" }), _jsxs("p", { children: [verb, " - ", noun] })] }));
}
