import { jsx as _jsx } from "react/jsx-runtime";
import './SpellsDisplay.css';
import Body from '../../../../../../../components/UI/body/Body';
import SpellDisplay from './spell/SpellDisplay';
export default function SpellsDisplay({ spells }) {
    return (_jsx(Body, { children: _jsx("div", { className: 'spells-display-shell', children: spells.map((spell, index) => _jsx(SpellDisplay, { spell: spell }, index)) }) }));
}
