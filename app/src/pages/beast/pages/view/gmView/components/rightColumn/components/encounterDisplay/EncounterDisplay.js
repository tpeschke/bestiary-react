import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './EncounterDisplay.css';
import NumberAppearingDisplay from "./components/NumberAppearingDisplay";
import ObjectivesDisplay from "./components/ObjectiveDisplay";
import SignDisplay from "./components/SignDisplay";
import TemperamentDisplay from "./components/TemperamentDisplay";
import TimeDisplay from "./components/TimeDisplay";
import VerbNounDisplay from "./components/VerbNounDisplay";
import encounterHooks from "./hooks/EncounterHooks";
import BattlefieldDisplay from './components/BattlefieldDisplay/BattlefieldDisplay';
import ComplicationDisplay from './components/ComplicationDisplay/ComplicationDisplay';
import { useEffect } from 'react';
import Icon from '../../../../../../../../../components/icon/Icon';
import Loading from '../../../../../../../../../components/loading/Loading';
import Body from '../../../../../../../components/UI/body/Body';
export default function EncounterDisplay({}) {
    return (_jsxs(_Fragment, { children: [_jsx("h2", { className: 'border', children: "Random Encounters" }), _jsx(Loading, { secondary: true, children: _jsx(EncounterShell, {}) })] }));
}
function EncounterShell({ setLoading }) {
    const { encounterInfo, generateEncounter } = encounterHooks();
    useEffect(() => {
        if (setLoading) {
            setLoading(!!encounterInfo);
        }
    }, [setLoading, encounterInfo]);
    if (encounterInfo) {
        const { signs, group, objectives, verb, noun, temperament, time, battlefield, complications } = encounterInfo;
        return (_jsx(_Fragment, { children: signs.beastSign?.sign ?
                _jsxs(_Fragment, { children: [_jsx(Body, { children: _jsxs("div", { className: 'encounter-display-shell', children: [_jsx(SignDisplay, { signInfo: signs }), _jsx(NumberAppearingDisplay, { groupInfo: group }), _jsx(ObjectivesDisplay, { objectives: objectives }), _jsx(VerbNounDisplay, { verb: verb, noun: noun }), _jsxs("div", { className: "pair-shell encounter-display-pair", children: [_jsx(TemperamentDisplay, { temperamentInfo: temperament }), _jsx(TimeDisplay, { time: time })] }), _jsx(BattlefieldDisplay, { battlefieldInfo: battlefield }), _jsx(ComplicationDisplay, { complications: complications })] }) }), _jsx("div", { className: 'encounter-input-shell', children: _jsx("button", { onClick: _ => generateEncounter(), children: _jsx(Icon, { iconName: 'redo' }) }) })] })
                :
                    _jsx(Body, { children: _jsx("p", { className: 'italic', children: "This Entry Has No Random Encounters" }) }) }));
    }
}
