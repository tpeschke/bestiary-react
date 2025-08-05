import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Body from '../../../../../../../../../../components/UI/body/Body';
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import { getTacticInfo } from '../../../../../../../../../../utilities/tacticOptions';
import { situationTooltip, tacticTooltip } from '../utilities/situationTooltip';
import './AttackStats.css';
export default function AttackStats({ attackStat }) {
    const { name, weaponName, measure, attack, damage, type, recovery, info, situation, tactic, rangeIncrement } = attackStat;
    return (_jsxs("div", { className: 'attack-stats-shell', children: [_jsxs("span", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": situationTooltip, children: [_jsx("h6", { children: situation }), " ", _jsx("p", { children: name ? name : weaponName ? weaponName : 'Default Attack' })] }), info && _jsx(HTMLDisplay, { html: info }), _jsxs("div", { className: 'attack-stats-inner-shell', children: [_jsxs("div", { className: 'attack-stats-left', children: [_jsxs("div", { children: [_jsxs("div", { children: [_jsx("p", { children: rangeIncrement ? 'RI' : 'Meas' }), _jsx("p", { children: rangeIncrement ? rangeIncrement : measure })] }), _jsxs("div", { children: [_jsx("p", { children: "Atk" }), _jsx("p", { children: attack })] })] }), _jsxs("div", { children: [_jsxs("div", { children: [_jsx("p", { children: "Type" }), _jsx("p", { children: type })] }), _jsxs("div", { children: [_jsx("p", { children: "Rec" }), _jsx("p", { children: recovery })] })] })] }), _jsxs("div", { children: [_jsx("p", { children: "Damage" }), _jsx("p", { children: damage })] })] }), tactic &&
                _jsx(Body, { children: _jsxs("p", { className: 'italic', "data-tooltip-id": "my-tooltip", "data-tooltip-content": tacticTooltip, children: ["+ ", getTacticInfo(tactic)] }) })] }));
}
