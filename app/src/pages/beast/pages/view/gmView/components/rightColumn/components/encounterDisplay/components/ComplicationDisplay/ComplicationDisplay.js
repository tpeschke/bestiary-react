import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ComplicationDisplay.css';
import BackUpComplicationDisplay from './components/BackUpComplication';
import BaseComplicationDisplay from './components/BaseComplication';
import LostComplicationDisplay from './components/LostComplication';
import RivalComplicationDisplay from './components/RivalComplication';
import WoundedComplicationDisplay from './components/WoundedComplication';
import EnchantedItemComplicationDisplay from './components/EnchantedItemComplication';
export default function ComplicationDisplay({ complications }) {
    if (complications.length === 0) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs("div", { className: 'complications-shell', children: [_jsxs("h3", { children: ["Complication", complications.length > 1 ? 's' : ''] }), _jsx("div", { children: complications.map((complication, index) => _jsx(GetComplicationComponent, { complication: complication }, index)) })] }));
}
function GetComplicationComponent({ complication }) {
    let complicationInnards = _jsx("p", { children: "Something Went Wrong" });
    switch (complication.type) {
        case RIVAL:
        case UNLIKELY_ALLIES:
            complicationInnards = _jsx(RivalComplicationDisplay, { info: complication });
            break;
        case WOUNDED:
            complicationInnards = _jsx(WoundedComplicationDisplay, { info: complication });
            break;
        case LOST:
            complicationInnards = _jsx(LostComplicationDisplay, { info: complication });
            break;
        case BACK_UP_COMING:
            complicationInnards = _jsx(BackUpComplicationDisplay, { info: complication });
            break;
        case ENCHANTED_ITEM:
            complicationInnards = _jsx(EnchantedItemComplicationDisplay, { info: complication });
            break;
        case TRAPPED:
        case INSANE:
        case DISEASED:
        case TIME_LIMIT:
        case POWERFUL_CASTER:
        case INFIGHTING:
        case LARGE:
            complicationInnards = _jsx(BaseComplicationDisplay, { info: complication });
            break;
    }
    return (_jsx("div", { className: 'complication-shell', children: complicationInnards }));
}
const RIVAL = 'Rival';
const WOUNDED = 'Wounded';
const TRAPPED = 'Trapped';
const INSANE = 'Insane';
const LOST = 'Lost';
const DISEASED = 'Diseased';
const TIME_LIMIT = 'Time Limit';
const BACK_UP_COMING = 'Back Up Coming';
const POWERFUL_CASTER = 'Powerful Weird-Adept or Servant';
const INFIGHTING = 'Infighting';
const LARGE = 'Large (50% more Vitality)';
const UNLIKELY_ALLIES = 'Unlikely Allies';
const ENCHANTED_ITEM = 'Enchanted Item';
