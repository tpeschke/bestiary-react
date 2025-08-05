import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../../Weirdshaping.css';
import { useEffect, useState } from 'react';
import CastingRules from './CastingRules';
import Body from '../../../../../../../components/UI/body/Body';
export default function CastingTypeSelect({ castingTypes }) {
    const [selected, setSelected] = useState();
    const [showExplanation, setShowExplanation] = useState(false);
    useEffect(() => {
        if (!selected) {
            setSelected(castingTypes.getIntialSelected);
        }
    }, []);
    return (_jsx(Body, { children: _jsxs(_Fragment, { children: [_jsxs("div", { className: 'casting-selection-shell', children: [_jsx("select", { value: selected, onChange: event => setSelected(+event.target.value), children: castingTypes.castingOptions.map(({ value, displayName }, index) => {
                                return _jsx("option", { value: value, children: displayName }, index);
                            }) }), _jsxs("button", { className: 'blue', onClick: _ => setShowExplanation(!showExplanation), children: [showExplanation ? 'Hide' : 'Show', " How to Use"] })] }), _jsxs("div", { className: showExplanation ? 'casting-explanation-shell' : 'displayNone', children: [_jsx("h3", { children: "How To Use" }), _jsx(Body, { children: _jsxs(_Fragment, { children: [_jsx("p", { className: 'bottom-margin', children: "These rules are to add variation and mimic different types of casting - giving an approximation of their strengths and weaknesses that players can use and plan around." }), _jsx("p", { className: 'bottom-margin', children: "Some casting types will give points. If you get points, you can add it to Range, Interval, or Effect - anywhere there\u2019s a static number." }), _jsx("p", { children: "For the most part, this is just a simple addition (1 Hour becomes 2 Hours, a +1 becomes a +2)." })] }) })] }), selected &&
                    _jsx("div", { className: 'casting-info-shell', children: _jsx(Body, { children: _jsx(CastingRules, { index: selected, spellnumberdie: castingTypes.getSpellNumberDie }) }) })] }) }));
}
