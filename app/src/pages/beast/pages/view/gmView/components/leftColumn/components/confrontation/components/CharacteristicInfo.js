import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Body from '../../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../../components/UI/pair/Pair';
import './Characteristics.css';
export default function CharacteristicsInfo({ title, characteristics }) {
    return (_jsxs("div", { className: 'characteristic-info-shell', children: [_jsx("h3", { children: title }), _jsx(Body, { children: _jsx(_Fragment, { children: characteristics.map(({ trait, rank }, index) => _jsx(Pair, { title: trait, info: rank, format: { title: 'none' } }, index)) }) })] }));
}
