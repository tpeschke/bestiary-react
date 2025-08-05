import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Body from "../../../../../../../components/UI/body/Body";
import LocationDisplay from "./components/LocationDisplay";
export default function LocationsDisplay({ locationsInfo }) {
    return (_jsx(_Fragment, { children: locationsInfo.length > 0 &&
            _jsxs("div", { className: 'variants-shell', children: [_jsx("h2", { className: 'border', children: "Locations & Adventures" }), _jsx(Body, { children: _jsx("div", { children: locationsInfo.map((location, index) => _jsx(LocationDisplay, { locationInfo: location }, index)) }) })] }) }));
}
