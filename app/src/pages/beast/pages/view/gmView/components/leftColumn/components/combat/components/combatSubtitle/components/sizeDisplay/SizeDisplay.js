import { jsx as _jsx } from "react/jsx-runtime";
import Pair from "../../../../../../../../../../../components/UI/pair/Pair";
export default function SizeDisplay({ size, knockback, noknockback }) {
    let knockbackString = `${knockback} `;
    if (noknockback || !knockback) {
        knockbackString = `N `;
    }
    size ? knockbackString += `(${size})` : null;
    return (_jsx(Pair, { title: "Knock-Back", info: knockbackString, format: { title: 'none', titleJustified: 'right' } }));
}
