import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Body from "../../../../../../../components/UI/body/Body";
import VariantDisplay from "./components/VariantDisplay";
export default function VariantsDisplay({ variantsInfo }) {
    return (_jsx(_Fragment, { children: variantsInfo.length > 0 &&
            _jsxs("div", { className: 'variants-shell', children: [_jsx("h2", { className: 'border', children: "Variants" }), _jsx(Body, { children: _jsx("div", { children: variantsInfo.map((variant, index) => _jsx(VariantDisplay, { variantInfo: variant }, index)) }) })] }) }));
}
