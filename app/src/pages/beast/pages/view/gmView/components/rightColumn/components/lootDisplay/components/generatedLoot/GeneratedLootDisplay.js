import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './GeneratedLoot.css';
import { useEffect } from "react";
import LootHooks from "./hooks/lootHooks";
import Body from "../../../../../../../../../components/UI/body/Body";
import AlmScriptDisplay from './components/AlmScriptDisplay';
import EnchantedItemDisplay from './components/EnchantedItemDisplay';
import PotionDisplay from './components/PotionDisplay';
import TalismanDisplay from './components/TalismanDisplay';
import ScrollDisplay from './components/ScrollDisplay';
import GenericLootDisplay from './components/GenericLootDisplay';
import Icon from '../../../../../../../../../../../components/icon/Icon';
export default function GeneratedLootDisplay({ lairLoot: lairParams, carriedLoot: carriedParams, maxPoints, setLoading }) {
    const { generateLoot, lairLoot, carriedLoot, setTimesToRoll, timesToRoll } = LootHooks();
    useEffect(() => {
        generateLoot(lairParams, carriedParams, maxPoints, timesToRoll);
    }, []);
    useEffect(() => {
        if (setLoading) {
            setLoading(!!lairLoot && !!carriedLoot);
        }
    }, [setLoading, lairLoot, carriedLoot]);
    async function regenerateLoot() {
        await generateLoot(lairParams, carriedParams, maxPoints, timesToRoll);
    }
    function setNumberOfMonsters(event) {
        const { value } = event.target;
        if (+value !== timesToRoll) {
            setTimesToRoll(+value);
            generateLoot(lairParams, carriedParams, maxPoints, +value);
        }
    }
    return (_jsxs("div", { className: "generated-loot-shell", children: [_jsx("h3", { children: "Carried Loot" }), carriedLoot && formatLootDisplay(carriedLoot, 'carried'), _jsx("h3", { children: "Lair Loot" }), lairLoot && formatLootDisplay(lairLoot, 'lair'), _jsxs("div", { className: 'input-shell', children: [_jsx("p", { children: "Number of Enemies: " }), _jsx("input", { onBlur: event => setNumberOfMonsters(event), placeholder: '1', type: "number", min: 0, max: 25 }), _jsx("button", { onClick: regenerateLoot, children: _jsx(Icon, { iconName: 'redo' }) })] })] }));
}
function formatLootDisplay(lootArray, type) {
    if (lootArray.length > 0) {
        return (_jsx(Body, { children: _jsx("ul", { className: "horizontal-list", children: lootArray.map((loot, index) => formatIndividualItem(loot, index)) }) }));
    }
    return (_jsx(Body, { children: _jsxs("p", { children: ["This entry has no ", type, " loot"] }) }));
}
function formatIndividualItem(loot, key) {
    switch (loot.type) {
        case 'alms':
            return _jsx(AlmScriptDisplay, { script: loot.script }, key);
        case 'enchanted':
            return _jsx(EnchantedItemDisplay, { enchantedItem: loot }, key);
        case 'potion':
            return _jsx(PotionDisplay, { potion: loot }, key);
        case 'talisman':
            return _jsx(TalismanDisplay, { talisman: loot }, key);
        case 'scroll':
            return _jsx(ScrollDisplay, { scroll: loot }, key);
        case 'generic':
            return _jsx(GenericLootDisplay, { info: loot.info }, key);
        default:
            return _jsx("p", { children: "Something went wrong" }, key);
    }
}
