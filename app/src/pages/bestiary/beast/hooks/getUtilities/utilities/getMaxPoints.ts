import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { createCombatInfoObject } from "./combatInfo/getCombatInfo"
import { getCombatSkulls } from "./combatInfo/utilities/bonfireSpecific/getCombatSkulls"
import { getSpecialModifier } from "./getSpecialModifier"

export function getMaxPoints(beastInfo: BeastInfo): number {
    const combatSkulls = getCombatSkulls(createCombatInfoObject(beastInfo.combatInfo, beastInfo.system))
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo
    const specialModifier = getSpecialModifier(beastInfo)

    return Math.max(combatSkulls + specialModifier, skillSkulls + specialModifier, socialSkulls + specialModifier)
}