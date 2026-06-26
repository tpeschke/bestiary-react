import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { createCombatInfoObject, getCombatSkulls } from "../../../models/gmBeastClass/components/CombatInfo"
import { getSpecialModifier } from "./getSpecialModifier"

export function getMaxPoints(beastInfo: BeastInfo): number {
    const combatSkulls = getCombatSkulls(createCombatInfoObject(beastInfo.combatInfo, beastInfo.system))
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo
    const specialModifier = getSpecialModifier(beastInfo)

    return Math.max(combatSkulls + specialModifier, skillSkulls + specialModifier, socialSkulls + specialModifier)
}