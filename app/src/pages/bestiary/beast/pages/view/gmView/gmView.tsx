import { useSelector } from "react-redux"

import { MiscInfo } from "./components/rightColumn/components/miscInfoDisplay/MiscInfoDisplay"

import RightColumn from "./components/rightColumn/RightColumn"
import LeftColumn from "./components/leftColumn/LeftColumn"
import Weirdshaping from "./components/weirdshaping/Weirdshaping"
import CanEditButton from "./components/canEditButton/CanEditButton"
import { SetPlayerNotes } from "../../../components/notes/notesDisplay"
import DoubleColumn from "../../../components/UI/doubleColumn/doubleColumn"
import NameHeader from "../../../components/UI/nameHeader/nameHeader"
import { UpdateSelectedRoleFunction, UpdateRoleModifierFunction, UpdateFavoriteFunction } from "../../../hooks/beastHooks"
import { selectGmView } from "../../../../../../redux/slices/bestiary/activeBeast/activeBeastSelectors"
import copyBeastQuickLink from "../../../utilities/copyQuickLink"

interface Props {
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateRoleModifier: UpdateRoleModifierFunction,
    updateNotes: SetPlayerNotes,
    updateFavorite: UpdateFavoriteFunction
}

export default function GMView({ updateSelectedRole, updateRoleModifier, updateNotes, updateFavorite }: Props) {
    const beast = useSelector(selectGmView)

    if (!beast) { return null }

    const {
        generalInfo, imageInfo, socialInfo, skillInfo, combatInfo, linkedInfo, lootInfo, castingInfo, spells, maxPoints, roleInfo,
        selectedRoleIndex, modifierIndex, hasModifier, selectedRoleID, id, roleName, notes, favorite, selfDoubtDie,
        system, saves
    } = beast
    const { name, appearance, intro, habitat, palette, folklores, size, scenarios, senses, diet, rarity, meta, canEdit } = generalInfo
    const { types, climates, variants, locations } = linkedInfo

    const { beast: locationsInfo } = locations

    const copyQuickLink = () => copyBeastQuickLink(selectedRoleID, modifierIndex)

    const miscInfo: MiscInfo = {
        senses,
        diet,
        climates: climates.beast
    }

    return (
        <>
            <NameHeader name={name} beastID={id} roleID={selectedRoleID} roleName={roleName} roleNameOrder={roleInfo.rolenameorder} favorite={favorite} updateFavorite={updateFavorite} />
            <DoubleColumn
                LeftColumn={LeftColumn({
                    beastId: id, beastName: name, imageInfo, socialInfo, skillInfo, combatInfo, size, roleInfo, selectedRoleIndex,
                    updateSelectedRole, updateRoleModifier, modifierIndex, copyQuickLink, hasModifier, selectedRoleID, selfDoubtDie,
                    system, saves
                })}
                RightColumn={RightColumn({ 
                    appearance, intro, palette, habitat, folklores, scenarios, types, miscInfo, variants, meta, locationsInfo, 
                    lootInfo, maxPoints, notes, updateNotes, rarity
                })}
            />
            <Weirdshaping castingTypes={castingInfo} spells={spells} />
            <CanEditButton canEdit={canEdit} beastID={id} />
        </>
    )
}
