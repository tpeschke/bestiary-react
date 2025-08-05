import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Pair from "../../../../../../../../../../components/UI/pair/Pair";
import calculatePrice from "./calculatePrice";
import formatHarvest from "./formatHarvest";
export default function formatPleroma({ name, difficulty, spell, harvest }, { modifier, rarityId }) {
    return {
        label: name,
        subtitle: `ID Risk: +${difficulty}+${modifier}`,
        innards: (_jsxs("div", { className: 'pleroma-description-shell', children: [_jsx(Pair, { title: "Spell", info: spell }), _jsx(Pair, { title: "Harvest Risk", info: formatHarvest(harvest, difficulty) }), _jsx(Pair, { title: "SP Bonus", info: calculateSpellPointBonus(rarityId) }), _jsx(Pair, { title: "Check Bonus", info: calculateCheckBonus(rarityId) }), _jsx(Pair, { title: "Price", info: calculatePrice(harvest, difficulty, modifier) })] }))
    };
}
function calculateSpellPointBonus(rarityId) {
    switch (rarityId) {
        case 1:
            return '+32';
        case 3:
            return '+16';
        case 5:
            return '+8';
        case 10:
            return '+4';
        default:
            return '+0';
    }
}
function calculateCheckBonus(rarityId) {
    switch (rarityId) {
        case 1:
            return '+16';
        case 3:
            return '+8';
        case 5:
            return '+4';
        case 10:
            return '+2';
        default:
            return '+0';
    }
}
