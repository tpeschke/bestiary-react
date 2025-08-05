import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './LootDisplay.css';
import PleromaDisplay from './components/pleromaDisplay/PleromaDisplay';
import SpecificLootDisplay from './components/specificLoot/SpecificLootDisplay';
import Body from '../../../../../../../components/UI/body/Body';
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import GeneratedLootDisplay from './components/generatedLoot/GeneratedLootDisplay';
import Loading from '../../../../../../../../../components/loading/Loading';
export default function LootDisplay({ lootInfo, rarity, maxPoints }) {
    const { pleroma, specificLoots, lootnotes, carriedLoot, lairLoot } = lootInfo;
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: 'border', children: "Loot" }), _jsx(SpecificLootDisplay, { specificLoots: specificLoots }), lootnotes && (_jsx(Body, { children: _jsx(HTMLDisplay, { html: lootnotes }) })), _jsx(Loading, { secondary: true, children: _jsx(GeneratedLootDisplay, { carriedLoot: carriedLoot, lairLoot: lairLoot, maxPoints: maxPoints }) }), _jsx(PleromaDisplay, { pleroma: pleroma, rarity: rarity })] }));
}
