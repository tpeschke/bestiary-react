import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Body from '../../../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../../../components/UI/pair/Pair';
import './CombatSubtitle.css';
import SizeDisplay from "./components/sizeDisplay/SizeDisplay";
import TraumaDisplay from "./components/traumaDisplay/TraumaDisplay";
export default function CombatSubtitle({ traumaInfo, initiative, knockbackInfo }) {
    const { trauma, notrauma, rollundertrauma } = traumaInfo;
    const { knockback, noknockback, size } = knockbackInfo;
    const showSection = trauma || notrauma || knockback || size;
    return (_jsx(_Fragment, { children: showSection &&
            _jsx(Body, { children: _jsxs("div", { className: "combat-subtitle-shell", children: [_jsx(TraumaDisplay, { trauma: trauma, notrauma: notrauma, rollundertrauma: rollundertrauma }), _jsx(SizeDisplay, { size: size, knockback: knockback, noknockback: noknockback }), _jsx(Pair, { title: "Initiative", info: initiative, format: { title: 'none', titleJustified: 'right' } })] }) }) }));
}
