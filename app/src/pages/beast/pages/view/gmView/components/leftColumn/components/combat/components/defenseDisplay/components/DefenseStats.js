import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from '../../../../../../../../../../../../components/icon/Icon';
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import './DefenseStats.css';
export default function DefenseStat({ defenseStats, showDefenseNameBanner }) {
    const { name, defense, flanks, parry, cover, parryDR, dr, info, tdr, defensename } = defenseStats;
    const tooltip = 'Damage above DR is reduced to 1. Doubling the damage needed, increases it to 2 and so on. So, for 5 TDR, dealing 9 damage only deals 1; dealing 23 damage deals 3.';
    const nameToShow = defensename ? defensename : name ? name : '';
    return (_jsxs("div", { className: `defense-stats-shell ${nameToShow === '' && showDefenseNameBanner ? 'top-border' : ''}`, children: [showDefenseNameBanner && nameToShow && _jsx("h6", { children: nameToShow }), info && _jsx(HTMLDisplay, { html: info }), _jsxs("div", { className: 'defense-stats-inner-shell', children: [_jsxs("div", { children: [_jsx("p", { children: "Def" }), _jsxs("p", { children: [defense, " ", _jsxs("span", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Parry Information (Parry / Flanks)", children: ["(", parry, " / ", flanks > 0 ? flanks : 1, ")"] })] })] }), _jsxs("div", { children: [_jsx("p", { children: "Cover" }), _jsx("p", { children: cover })] })] }), _jsxs("div", { className: 'defense-stats-inner-shell', children: [_jsxs("div", { children: [_jsx("p", { children: "Parry DR" }), _jsx("p", { children: parryDR })] }), _jsxs("div", { children: [_jsx("p", { children: "DR" }), _jsxs("p", { children: [dr, " ", tdr && _jsx(Icon, { iconName: 'wall', color: 'black', tooltip: tooltip })] })] })] })] }));
}
