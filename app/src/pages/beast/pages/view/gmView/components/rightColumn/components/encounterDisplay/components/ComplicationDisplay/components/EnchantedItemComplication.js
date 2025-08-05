import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
import { enchantedItemPage } from '../../../../../../../../../../../../frontend-config';
export default function EnchantedItemComplicationDisplay({ info }) {
    const { type } = info;
    return (_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("a", { href: enchantedItemPage, target: '_blank', children: _jsx("p", { children: type }) })] }));
}
