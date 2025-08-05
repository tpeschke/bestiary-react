import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import RightColumn from "./components/rightColumn/RightColumn";
import LeftColumn from "./components/leftColumn/LeftColumn";
import Weirdshaping from "./components/weirdshaping/Weirdshaping";
import CanEditButton from "./components/canEditButton/CanEditButton";
import DoubleColumn from "../../../components/UI/doubleColumn/doubleColumn";
import NameHeader from "../../../components/UI/nameHeader/nameHeader";
export default function GMView({ beast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite }) {
    const { generalInfo, imageInfo, socialInfo, skillInfo, combatInfo, linkedInfo, lootInfo, castingInfo, spells, maxPoints, roleInfo, selectedRoleIndex, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, id, roleName, notes, favorite } = beast;
    const { name, appearance, intro, habitat, folklores, size, scenarios, senses, diet, rarity, meta, canEdit } = generalInfo;
    const { types, climates, variants, locations } = linkedInfo;
    const { beast: locationsInfo } = locations;
    const miscInfo = {
        senses,
        diet,
        rarity,
        climates: climates.beast
    };
    return (_jsxs(_Fragment, { children: [_jsx(NameHeader, { name: name, beastID: id, roleID: selectedRoleID, roleName: roleName, roleNameOrder: roleInfo.rolenameorder, favorite: favorite, updateFavorite: updateFavorite }), _jsx(DoubleColumn, { LeftColumn: LeftColumn({
                    beastId: beast.id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
                    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID
                }), RightColumn: RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, lootInfo, maxPoints, notes, updateNotes }) }), _jsx(Weirdshaping, { castingTypes: castingInfo, spells: spells }), _jsx(CanEditButton, { canEdit: canEdit, beastID: id })] }));
}
