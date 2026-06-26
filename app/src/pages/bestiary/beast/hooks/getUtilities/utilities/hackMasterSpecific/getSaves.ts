import { SaveObject } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import getDodgeSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getDodgeSave"
import getMentalSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getMentalSave"
import getPhysicalSave from "@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getPhysicalSave"
import { BeastInfo } from "../../../../interfaces/viewInterfaces"
import { isRoleSelected, getSelectedRoleIndex } from "../getRoleInfo"

export function getSaves(beastInfo: BeastInfo, roleId: string | null): [SaveObject, SaveObject, SaveObject] | null {
    if (beastInfo.system === 'HackMaster') {
        const { epValueIndex: mainSocialEpValueIndex } = beastInfo.socialInfo
        const { epValueIndex: mainSkillEpValueIndex } = beastInfo.skillInfo
        const { epValueIndex: mainCombatEpValueIndex } = beastInfo.combatInfo

        const roleSelected = isRoleSelected(beastInfo, roleId)
        const index = getSelectedRoleIndex(beastInfo, roleId)
        const selectedModifier = beastInfo.roleModifier

        const socialEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].socialInfo.epValueIndex : mainSocialEpValueIndex) + selectedModifier
        const skillEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].skillInfo.epValueIndex : mainSkillEpValueIndex) + selectedModifier
        const combatEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].combatInfo.epValueIndex : mainCombatEpValueIndex) + selectedModifier

        return [{
            label: 'Physical',
            rank: getPhysicalSave(combatEpValueIndex)
        }, {
            label: 'Mental',
            rank: getMentalSave(socialEpValueIndex)
        }, {
            label: 'Dodge',
            rank: getDodgeSave(skillEpValueIndex)
        }]
    }

    return null
}