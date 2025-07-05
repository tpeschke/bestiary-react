import GMBeastClass from "../../models/GMBeastClass"
import { MiscInfo } from "./components/rightColumn/components/miscInfoDisplay/MiscInfoDisplay"

import NameHeader from "../../components/UI/nameHeader/nameHeader"
import DoubleColumn from "../../components/UI/doubleColumn/doubleColumn"
import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"
import Weirdshaping from "./components/weirdshaping/Weirdshaping"
import { UpdateRoleModifierFunction, UpdateSelectedRoleFunction } from "../../hooks/beastHooks"
import { SetPlayerNotes } from "../../components/notes/notesDisplay"

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    updateNotes: SetPlayerNotes
}

export default function GMView({ beast, updateSelectedRole, updateRoleModifier, updateNotes }: Props) {
    const { generalInfo, imageInfo, socialInfo, skillInfo, combatInfo, linkedInfo, lootInfo, castingInfo, spells, maxPoints, roleInfo,
        selectedRoleIndex, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, id, roleName, notes } = beast
    const { name, appearance, intro, habitat, folklores, size, scenarios, senses, diet, rarity, meta } = generalInfo
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
            <NameHeader name={name} beastID={id} roleID={selectedRoleID} roleName={roleName} roleNameOrder={roleInfo.rolenameorder} />
            <DoubleColumn
                LeftColumn={LeftColumn({
                    beastId: beast.id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
                    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID
                })}
                RightColumn={RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, lootInfo, maxPoints, notes, updateNotes })}
            />
            <Weirdshaping castingTypes={castingInfo} spells={spells} />
        </>
    )
}