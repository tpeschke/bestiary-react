import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../EncounterDisplay.css';
export default function ObjectivesDisplay({ objectives }) {
    const { player, enemy } = objectives;
    return (_jsxs("div", { className: 'objectives-shell', children: [_jsxs("div", { className: 'objective-pair', children: [_jsx("h3", { children: "Enemy Objective" }), _jsx("p", { children: enemy })] }), _jsxs("div", { className: 'objective-pair', children: [_jsx("h3", { children: "Player Objective" }), _jsx("p", { children: player })] })] }));
}
