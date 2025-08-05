import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import RoleTitle from "../../../roleTitle/RoleTitle";
import SpecialInfo from "../specialInfo/specialInfo";
import ArchetypeDisplay from "./components/archetype/ArchetypeDisplay";
import CharacteristicsDisplay from "./components/CharacteristicsDisplay";
export default function ConfrontationSection({ socialInfo }) {
    const [hasArchetypes, setHasArchetypes] = useState(false);
    const [hasCharacteristics, setHasCharacteristics] = useState(false);
    const { socialrole, socialpoints, conflicts, atk_conf, def_conf, socialsecondary, archetypeInfo } = socialInfo;
    useEffect(() => {
        const { conflicts } = socialInfo;
        if (conflicts && !hasCharacteristics) {
            const { burdens, convictions, descriptions, relationships, flaws } = conflicts;
            const hasDescriptions = descriptions.length > 0;
            const hasConvictions = convictions.length > 0;
            const hasRelationships = relationships.length > 0;
            const hasFlaws = flaws.length > 0;
            const hasBurdens = burdens.length > 0;
            setHasCharacteristics(hasDescriptions || hasConvictions || hasRelationships || hasFlaws || hasBurdens);
        }
    }, []);
    const showDefenseSection = !!(def_conf && def_conf !== '');
    const showAttackSection = !!(atk_conf && atk_conf !== '');
    // When there is nothing to display in this section, this border helps visually separate it from the next section
    const hasBottomBorder = !(showDefenseSection || showAttackSection || hasCharacteristics || hasArchetypes);
    return (_jsxs(_Fragment, { children: [_jsx(RoleTitle, { title: 'Confrontation', points: socialpoints, role: socialrole, secondaryRole: socialsecondary, hasBottomBorder: hasBottomBorder }), showDefenseSection &&
                _jsxs(_Fragment, { children: [_jsx("h3", { children: "Defense Info" }), _jsx(SpecialInfo, { info: def_conf })] }), showAttackSection &&
                _jsxs(_Fragment, { children: [_jsx("h3", { children: "Attack Info" }), _jsx(SpecialInfo, { info: atk_conf })] }), _jsx(ArchetypeDisplay, { archetypeInfo: archetypeInfo, points: socialpoints, setHasArchetypes: setHasArchetypes }), hasCharacteristics && _jsx(CharacteristicsDisplay, { characteristicInfo: conflicts })] }));
}
