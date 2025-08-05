import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../../../../../../../../../../../../components/icon/Icon";
export default function PotionDisplay({ potion }) {
    const { name, swigs, isSalve, effect, price } = potion;
    return (_jsxs("li", { children: [name, " w/ ", swigs, " ", formatApplicationString(isSalve, swigs), _jsx(Icon, { iconName: "info", margin: 'left', tooltip: formatEffectString(effect, price) })] }));
}
function formatApplicationString(isSalve, swigs) {
    return `${isSalve ? 'application' : 'swig'}${swigs > 1 ? 's' : ''}`;
}
function formatEffectString(effect, price) {
    return `${effect}\n${price} sc`;
}
