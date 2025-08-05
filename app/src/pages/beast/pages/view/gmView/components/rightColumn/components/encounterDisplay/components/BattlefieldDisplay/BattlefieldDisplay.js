import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../../EncounterDisplay.css';
import explanation from './assets/explanation.jpg';
import alley from './assets/alley.jpg';
import dangerWall from './assets/dangerWall.jpg';
import divide from './assets/divide.jpg';
import funnel from './assets/funnel.jpg';
import guardian from './assets/guardian.jpg';
import horseshoe from './assets/horseshoe.jpg';
import kingOfTheHill from './assets/kingOfTheHill.jpg';
import longPath from './assets/longPath.jpg';
import openField from './assets/openField.jpg';
import pillar from './assets/pillar.jpg';
import pincer from './assets/pincer.jpg';
import uphill from './assets/uphill.jpg';
import Icon from '../../../../../../../../../../../components/icon/Icon';
export default function BattlefieldDisplay({ battlefieldInfo }) {
    const { battlefield, pattern } = battlefieldInfo;
    const gmgLink = "https://docs.google.com/document/d/12YPhpdKB1L4KJYAlG3Jpz2jlRnaXtPTh-Os-z3ABMRs/edit?usp=drive_link";
    const htmlTooltip = {
        component: getImage(pattern),
        id: 'pattern-tooltip'
    };
    return (_jsxs("div", { className: 'pair-shell secondary-div', children: [_jsxs("h3", { children: ["Battlefield / Pattern ", _jsx("a", { href: gmgLink, target: "_blank", children: _jsx(Icon, { iconName: 'link', tooltip: 'This links to the GMG where Patterns are discussed (Step 4.3).' }) })] }), _jsxs("div", { children: [_jsxs("p", { children: [battlefield, " / ", pattern] }), " ", _jsx(Icon, { iconName: 'image', htmlTooltip: htmlTooltip })] })] }));
}
function getImage(pattern) {
    const battlefieldPatternDictionary = {
        'Open Field': openField,
        'Divide': divide,
        'Danger Wall': dangerWall,
        'Pillar': pillar,
        'Guardian': guardian,
        'Pincer': pincer,
        'Funnel': funnel,
        'Horseshoe': horseshoe,
        'Long-Path': longPath,
        'Alley': alley,
        'Up-Hill': uphill,
        'King of the Hill': kingOfTheHill
    };
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: explanation }), _jsx("img", { src: battlefieldPatternDictionary[pattern] })] }));
}
