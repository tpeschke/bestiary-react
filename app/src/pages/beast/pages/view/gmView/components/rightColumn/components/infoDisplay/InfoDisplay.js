import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Body from '../../../../../../../components/UI/body/Body';
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import './infoDisplay.css';
export default function InfoDisplay({ section, info }) {
    const showSection = info && info !== '';
    return (_jsx(_Fragment, { children: showSection &&
            _jsx(_Fragment, { children: _jsxs("div", { className: 'info-display-shell', children: [_jsx("h2", { className: 'border', children: section }), _jsx(Body, { children: _jsx(HTMLDisplay, { html: info }) })] }) }) }));
}
