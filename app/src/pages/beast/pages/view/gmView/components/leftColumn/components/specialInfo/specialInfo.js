import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Body from "../../../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../../../components/UI/htmlDisplay/htmlDisplay";
export default function SpecialInfo({ info }) {
    return (_jsx(_Fragment, { children: info ?
            _jsx(Body, { children: _jsx(HTMLDisplay, { html: info }) })
            :
                _jsx(_Fragment, {}) }));
}
