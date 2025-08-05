import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './Weirdshaping.css';
import CastingTypeSelect from './components/casting/CastingTypeSelect';
import SpellsDisplay from './components/spells/SpellsDisplay';
export default function Weirdshaping({ castingTypes, spells }) {
    return (_jsx(_Fragment, { children: spells?.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: 'border', children: "Weirdshaping" }), _jsx(CastingTypeSelect, { castingTypes: castingTypes }), _jsx(SpellsDisplay, { spells: spells })] })) }));
}
