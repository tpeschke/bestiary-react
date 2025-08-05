import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ConfrontationSection from "./components/confrontation/ConfrontationSection";
import SkillSection from "./components/skills/SkillSection";
import CombatSection from "./components/combat/CombatSection";
import RoleSelect from "./components/roleSelect/RoleSelect";
import RatingModifierDisplay from "./components/RatingModifier/RatingModifierDisplay";
import FullImage from "../../../../../components/UI/fullImage/fullImage";
export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex, updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID }) {
    return (_jsxs(_Fragment, { children: [_jsx(FullImage, { imageParam: beastId, altText: beastName, artistInfo: imageInfo.artistInfo?.genericArtistInfo, roleID: selectedRoleID }), _jsx(RoleSelect, { roleInfo: roleInfo, updateSelectedRole: updateSelectedRole, selectedRoleIndex: selectedRoleIndex, copyQuickLink: copyQuickLink, hasModifier: hasModifier }), _jsx(ConfrontationSection, { socialInfo: socialInfo }), _jsx(SkillSection, { skillInfo: skillInfo }), _jsx(CombatSection, { combatInfo: combatInfo, size: size }), _jsx(RatingModifierDisplay, { updateRoleModifier: updateRoleModifier, modifierIndex: modifierIndex, copyQuickLink: copyQuickLink, hasModifier: hasModifier })] }));
}
