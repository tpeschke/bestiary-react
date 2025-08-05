import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from "../../../../../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../../../../../components/UI/htmlDisplay/htmlDisplay";
import RoleTitle from "../../../../../roleTitle/RoleTitle";
export default function TacticsAndStrategy({ tactics }) {
    const showSection = tactics && tactics !== '';
    return (_jsx(_Fragment, { children: showSection &&
            _jsxs(_Fragment, { children: [_jsx(RoleTitle, { title: 'Tactics & Strategies' }), _jsx(Body, { children: _jsx(HTMLDisplay, { html: tactics }) })] }) }));
}
