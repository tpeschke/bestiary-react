import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PleromaDisplay.css';
import Drawers from "../../../../../../../../../../../components/drawers/Drawers";
import formatPleroma from './utilities/formatPleroma';
export default function PleromaDisplay({ pleroma, rarity }) {
    const formattedPleroma = pleroma.map((singlePleroma) => formatPleroma(singlePleroma, rarity));
    return (_jsxs("div", { className: 'pleroma-display-shell', children: [_jsx("h3", { children: "Pleroma" }), pleroma.length > 0 ? (_jsx(Drawers, { drawerInnards: formattedPleroma })) : (_jsx("p", { className: "italic", children: "This entry has no Pleroma" }))] }));
}
