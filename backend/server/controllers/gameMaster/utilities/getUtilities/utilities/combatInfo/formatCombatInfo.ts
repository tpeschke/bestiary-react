import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getSkullNumber from "../getSkulls"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/combat/knockBackCalculator"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityAndTraumaCalculator"
import getInitiative from "./utilities/getInitiative"

export default function formatCombatInfo(
    tactics: string,
    combatRole: string,
    combatSecondary: string,
    combatPoints: number,
    attackInfo: string,
    defenseInfo: string,
    noTrauma: boolean,
    knockback: number,
    singleDieVitality: boolean,
    noKnockback: boolean,
    rollUnderTrauma: number,
    isIncorporeal: boolean,
    weaponBreakageVitality: boolean,
    size: Size
): CombatInfo {
    const combatSkulls = getSkullNumber(combatPoints)
    const skullIndex = getSkullIndex(combatSkulls)

    return {
        tactics, combatRole, combatSecondary,
        combatSkulls,
        skullIndex,
        attackInfo: attackInfo ?? '',
        defenseInfo: defenseInfo ?? '',
        initiative: getInitiative(combatRole, skullIndex),
        attacks: [],
        defenses: [],
        movements: [],
        vitalityInfo: {
            noTrauma, singleDieVitality, noKnockback, rollUnderTrauma, isIncorporeal, weaponBreakageVitality,
            knockback: calculateKnockBack(knockback, size),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex),
            locationalVitalities: []
        }
    }
}