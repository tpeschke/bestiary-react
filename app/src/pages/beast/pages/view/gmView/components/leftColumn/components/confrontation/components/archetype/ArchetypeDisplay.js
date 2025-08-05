import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './ArchetypeDisplay.css';
import Icon from '../../../../../../../../../../../components/icon/Icon';
import Body from '../../../../../../../../../components/UI/body/Body';
import Pair from '../../../../../../../../../components/UI/pair/Pair';
import { useEffect, useState } from 'react';
export default function ArchetypeDisplay({ archetypeInfo, setHasArchetypes }) {
    const { hasarchetypes, hasmonsterarchetypes, normalArchetypes, monsterArchetypes, difficultyDie } = archetypeInfo;
    const [currentHasMonsterArchetype, setCurrentHasMonsterArchetypes] = useState(false);
    const [currentHasArchetype, setCurrentHasArchetypes] = useState(false);
    useEffect(() => {
        if (currentHasMonsterArchetype !== hasmonsterarchetypes) {
            setCurrentHasMonsterArchetypes(hasmonsterarchetypes);
            setHasArchetypes(hasmonsterarchetypes);
        }
        else if (currentHasArchetype !== hasarchetypes) {
            setCurrentHasArchetypes(hasarchetypes);
            setHasArchetypes(hasarchetypes);
        }
    });
    let tooltip = '';
    let iconName = 'd20';
    if (hasarchetypes) {
        if (normalArchetypes?.reverse) {
            tooltip = "Completely reverse this Archetype.\nExample: 'Rogue with a heart of gold' > 'A nice guy with a vile heart'";
            iconName = 'reversal';
        }
        else if (normalArchetypes?.deviation) {
            tooltip = "Change one thing about this Archetype.\nExample: 'Rogue with a heart of gold' > 'A rogue with a vile heart'";
            iconName = 'deviation';
        }
    }
    const hasSomethingToDisplay = hasmonsterarchetypes || hasarchetypes;
    return (_jsx(_Fragment, { children: hasSomethingToDisplay &&
            _jsxs("div", { className: 'archetype-display-shell', children: [_jsx("h3", { children: "Archetype Info" }), _jsx(Body, { children: _jsxs(_Fragment, { children: [hasmonsterarchetypes &&
                                    _jsxs("div", { className: 'monster-archetype-shell', children: [_jsx("div", { children: monsterArchetypes?.archetype.map((archetype, index) => _jsx("p", { children: archetype }, index)) }), _jsx("p", { children: difficultyDie })] }), (hasarchetypes && normalArchetypes) &&
                                    _jsxs("span", { children: [tooltip && _jsx(Icon, { iconName: iconName, margin: 'right', float: 'left', tooltip: tooltip }), _jsx(Pair, { title: normalArchetypes?.archetype, info: difficultyDie, format: { title: 'none', position: 'opposite', titleJustified: 'left' } })] })] }) })] }) }));
}
