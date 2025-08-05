import { jsx as _jsx } from "react/jsx-runtime";
import { enchantedItemBase } from "../../../../../../../../../../../../frontend-config";
export default function EnchantedItemDisplay({ enchantedItem }) {
    const { id, name } = enchantedItem;
    return (_jsx("li", { children: _jsx("a", { href: enchantedItemBase + id, target: "_blank", children: name }) }));
}
