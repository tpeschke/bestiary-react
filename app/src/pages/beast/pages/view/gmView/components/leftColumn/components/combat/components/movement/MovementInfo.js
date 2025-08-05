import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './MovementInfo.css';
import Pair from '../../../../../../../../../components/UI/pair/Pair';
export default function MovementInfo({ movements }) {
    return (_jsxs("div", { className: 'movements-shell', children: [_jsx(Pair, { title: "Movement", info: "ft / sec", format: { heading: true, position: 'opposite', info: 'minor', noBorder: true } }), movements && movements?.length > 0 ?
                _jsx(_Fragment, { children: movements.map(({ type, stroll, walk, jog, run, sprint }, index) => {
                        return (_jsxs("div", { className: 'movement-shell', children: [_jsx("p", { children: type ? type : 'Land' }), _jsxs("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Crawl / Stroll", children: ["C: ", stroll] }), _jsxs("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Walk", children: ["W: ", walk] }), _jsxs("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Jog", children: ["J: ", jog] }), _jsxs("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Run", children: ["R: ", run] }), _jsxs("p", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": "Sprint", children: ["S: ", sprint] })] }, index));
                    }) })
                :
                    _jsx("p", { className: 'no-movement', children: "This Monster Has No Movement" })] }));
}
