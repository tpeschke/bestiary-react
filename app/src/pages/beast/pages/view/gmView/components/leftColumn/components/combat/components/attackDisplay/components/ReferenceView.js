import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Body from "../../../../../../../../../../components/UI/body/Body";
import './AttackStats.css';
import { getTacticInfo } from "../../../../../../../../../../utilities/tacticOptions";
import { situationTooltip, tacticTooltip } from "../utilities/situationTooltip";
export default function ReferenceView({ referenceInfo }) {
    const { situation, tactic, reference } = referenceInfo;
    return (_jsxs("div", { className: 'attack-stats-shell', children: [_jsx("span", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": situationTooltip, children: _jsx("h6", { children: situation }) }), _jsx(Body, { children: _jsxs("p", { className: 'italic', children: ["As ", reference] }) }), tactic &&
                _jsx(Body, { children: _jsxs("p", { className: 'italic', "data-tooltip-id": "my-tooltip", "data-tooltip-content": tacticTooltip, children: ["+ ", getTacticInfo(tactic)] }) })] }));
}
