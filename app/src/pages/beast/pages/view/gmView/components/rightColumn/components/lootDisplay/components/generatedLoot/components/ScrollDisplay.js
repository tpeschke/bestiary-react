import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../../../components/icon/Icon";
export default function ScrollDisplay({ scroll }) {
    const { name, sp, tooltip } = scroll;
    return (_jsxs("li", { children: [name, " (", sp, " SP)", _jsx(Icon, { iconName: "info", margin: 'left', tooltip: formatTooltipString(tooltip) })] }));
}
function formatTooltipString(breakdown) {
    return `Requires Literacy in the language and takes 2 Sec / SP to read, after which, it shapes the spell. The scroll is destroyed on shape.\nRudiment Breakdown: ${breakdown}`;
}
