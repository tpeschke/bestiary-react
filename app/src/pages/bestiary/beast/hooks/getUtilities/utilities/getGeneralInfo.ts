import { SpecificGeneralInfo, NonspecificGeneralInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getRarity } from "@bestiary/common/utilities/get/getRarity"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { getSelectedRoleIndex, isRoleSelected } from "./getRoleInfo"

export function getGeneralInfo(beastInfo: BeastInfo, roleId: string | null): SpecificGeneralInfo {
    const entryGeneralInfo = beastInfo.generalInfo
    const { size: mainSize, rarity: baseRarity, appearance } = entryGeneralInfo

    const roleSelected = isRoleSelected(beastInfo, roleId)
    const index = getSelectedRoleIndex(beastInfo, roleId)

    const size = roleSelected ? beastInfo.roleInfo.roles[index].generalInfo.size : mainSize

    const rarity = getRarity(baseRarity.rarityId, beastInfo.system)

    return {
        ...entryGeneralInfo,
        rarity,
        appearance: beastInfo.system === 'Bonfire' ? appearance[BONFIRE] : appearance[HACKMASTER],
        // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
        size: size ?? mainSize
    }
}

export function getRawGeneralInfo(beastInfo: BeastInfo, roleId: string | null): NonspecificGeneralInfo {
    const entryGeneralInfo = beastInfo.generalInfo
    const { size: mainSize, rarity: baseRarity } = entryGeneralInfo

    const roleSelected = isRoleSelected(beastInfo, roleId)
    const index = getSelectedRoleIndex(beastInfo, roleId)

    const size = roleSelected ? beastInfo.roleInfo.roles[index].generalInfo.size : mainSize

    const rarity = getRarity(baseRarity.rarityId, beastInfo.system)

    return {
        ...entryGeneralInfo,
        rarity,
        // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
        size: size ?? mainSize
    }
}