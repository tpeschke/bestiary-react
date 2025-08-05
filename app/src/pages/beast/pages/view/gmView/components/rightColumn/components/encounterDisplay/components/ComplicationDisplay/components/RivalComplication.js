import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../ComplicationDisplay.css';
import { beastPage } from '../../../../../../../../../../../../frontend-config';
export default function RivalComplicationDisplay({ info }) {
    const { type, actors } = info;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: "Type" }), _jsx("p", { children: type })] }), _jsxs("div", { className: 'pair-shell', children: [_jsx("h4", { children: type === 'Rival' ? 'Rivals' : 'Allies' }), _jsx("a", { href: beastPage + actors.id, target: '_blank', children: _jsx("p", { children: actors.name }) })] })] }));
}
