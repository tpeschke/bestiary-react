import { BeastInfo } from "../../../interfaces/viewInterfaces"
import CombatInfoClass from "../../../models/gmBeastClass/components/CombatInfoClass"
import { getSpecialModifier } from "./getSpecialModifier"

export function getMaxPoints(beastInfo: BeastInfo): number {
    const { combatSkulls } = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo
    const specialModifier = getSpecialModifier(beastInfo)

    return Math.max(combatSkulls + specialModifier, skillSkulls + specialModifier, socialSkulls + specialModifier)
}