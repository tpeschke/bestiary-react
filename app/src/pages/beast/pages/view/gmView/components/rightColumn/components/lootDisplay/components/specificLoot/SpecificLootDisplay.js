import { jsx as _jsx } from "react/jsx-runtime";
export default function SpecificLootDisplay({ specificLoots = [] }) {
    return (_jsx("ul", { className: "horizontal-list", children: specificLoots.map((loot) => formatSpecificLoot(loot)) }));
}
function formatSpecificLoot({ loot, price, id }) {
    if (price) {
        loot += ` (${price})`;
    }
    return _jsx("li", { children: loot }, id);
}
