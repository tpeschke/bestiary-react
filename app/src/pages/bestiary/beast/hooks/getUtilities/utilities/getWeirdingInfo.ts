import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { BeastInfo } from "../../../interfaces/viewInterfaces"
import CastingClass from "../../../pages/view/gmView/components/weirdshaping/models/CastingClass"
import { getSelectedRoleID } from "./getRoleInfo"

function filterSpells(roleID: string | null) {
    return (spells: Spell[], spell: Spell) => {
        if (spell.allroles || spell.roleid === roleID) {
            spells.push(spell)
        }
        return spells
    }
}

export function getSpells(beastInfo: BeastInfo, roleId: string | null): Spell[] {
    const entrySpells = beastInfo.castingInfo?.spells ?? []
    return entrySpells.reduce(filterSpells(getSelectedRoleID(beastInfo, roleId)), [])
}

export function getCastingInfo(beastInfo: BeastInfo): CastingClass {
    return new CastingClass(beastInfo.castingInfo?.casting)
}