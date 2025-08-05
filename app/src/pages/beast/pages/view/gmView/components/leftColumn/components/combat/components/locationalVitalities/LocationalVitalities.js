import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from "../../../../../../../../../components/UI/body/Body";
import Pair from "../../../../../../../../../components/UI/pair/Pair";
export default function LocationVitalities({ locationalVitalities }) {
    return (_jsx(_Fragment, { children: locationalVitalities.length > 0 &&
            _jsx(Body, { children: _jsxs(_Fragment, { children: [_jsx("h6", { children: "Locational Vitalities" }), _jsx(Body, { children: _jsx(_Fragment, { children: locationalVitalities.map(({ location, vitality }, index) => {
                                    return (_jsx(Pair, { title: location, info: vitality, format: { title: 'none' } }, index));
                                }) }) })] }) }) }));
}
