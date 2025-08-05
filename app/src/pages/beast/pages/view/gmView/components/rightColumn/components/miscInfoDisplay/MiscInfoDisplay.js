import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './MiscInfoDisplay.css';
import Body from '../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../components/UI/pair/Pair';
import ClimatesDisplay from './climates/ClimatesDisplay';
export default function MiscInfoDisplay({ miscInfo }) {
    const { senses, diet, rarity, climates } = miscInfo;
    const showSenses = senses && senses !== '';
    const showDiet = diet && diet !== '';
    const showClimates = climates.length > 0;
    return (_jsxs("div", { className: 'misc-info-display-shell', children: [_jsx("h2", { className: 'border', children: "Misc Info" }), _jsx(Body, { children: _jsxs("div", { children: [showSenses && _jsx(Pair, { title: 'Senses', info: senses }), showDiet && _jsx(Pair, { title: 'Diet', info: diet }), _jsx(Pair, { title: 'Rarity', info: formatRarityString(rarity) }), showClimates && _jsx(ClimatesDisplay, { climates: climates })] }) })] }));
}
function formatRarityString({ rarityName, modifier }) {
    let rarityString = rarityName;
    if (modifier) {
        rarityString += ` (+${modifier})`;
    }
    return rarityString;
}
