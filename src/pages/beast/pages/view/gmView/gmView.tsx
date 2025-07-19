import { MiscInfo } from "./components/rightColumn/components/miscInfoDisplay/MiscInfoDisplay"

import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"
import Weirdshaping from "./components/weirdshaping/Weirdshaping"
import CanEditButton from "./components/canEditButton/CanEditButton"
import { SetPlayerNotes } from "../../../components/notes/notesDisplay"
import DoubleColumn from "../../../components/UI/doubleColumn/doubleColumn"
import NameHeader from "../../../components/UI/nameHeader/nameHeader"
import { UpdateSelectedRoleFunction, UpdateRoleModifierFunction, UpdateFavoriteFunction } from "../../../hooks/beastHooks"
import GMBeastClass from "../../../models/gmBeastClass/GMBeastClass"

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    updateNotes: SetPlayerNotes,
    updateFavorite: UpdateFavoriteFunction
}

export default function GMView({ beast, updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite }: Props) {
    const { generalInfo, imageInfo, socialInfo, skillInfo, combatInfo, linkedInfo, lootInfo, castingInfo, spells, maxPoints, roleInfo,
        selectedRoleIndex, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, id, roleName, notes, favorite } = beast
    const { name, appearance, intro, habitat, folklores, size, scenarios, senses, diet, rarity, meta, canEdit } = generalInfo
    const { types, climates, variants, locations } = linkedInfo

    const { beast: locationsInfo } = locations

    const miscInfo: MiscInfo = {
        senses,
        diet,
        rarity,
        climates: climates.beast
    }

    return (
        <>
            <NameHeader name={name} beastID={id} roleID={selectedRoleID} roleName={roleName} roleNameOrder={roleInfo.rolenameorder} favorite={favorite} updateFavorite={updateFavorite} />
            <DoubleColumn
                LeftColumn={LeftColumn({
                    beastId: beast.id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
                    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID
                })}
                RightColumn={RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, lootInfo, maxPoints, notes, updateNotes })}
            />
            <Weirdshaping castingTypes={castingInfo} spells={spells} />
            <CanEditButton canEdit={canEdit} beastID={id} />
        </>
    )
}