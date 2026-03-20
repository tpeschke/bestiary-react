import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getSkullNumber from "../getSkulls"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/knockBackCalculator"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue";
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect"

export default function formatCombatInfo(
    limitNotes: string,
    combatRole: string,
    combatSecondary: string,
    combatSkulls: number,
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
    combatSkulls = combatSkulls ?? getSkullNumber(combatPoints)
    const skullIndex = getSkullIndex(combatSkulls)

    const baseEpValue = getBaseEPValue(combatSkulls)
    const epValueIndex = getEPIndex(baseEpValue)

    return {
        type: 'Bonfire',
        combatRole, combatSecondary, limitNotes,
        combatSkulls,
        skullIndex,
        epValue: calculateSecondaryRoleEffect(baseEpValue, combatSecondary),
        epValueIndex,
        attackInfo: attackInfo ?? '',
        defenseInfo: defenseInfo ?? '',
        initiative: getInitiative(combatRole, skullIndex, 'Bonfire'),
        attacks: [],
        defenses: [],
        movements: [],
        vitalityInfo: {
            noTrauma, singleDieVitality, noKnockback, rollUnderTrauma, isIncorporeal, weaponBreakageVitality,
            knockback: calculateKnockBack(knockback, size),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex, weaponBreakageVitality, singleDieVitality, 'Bonfire'),
            locationalVitalities: [],
            defenseNFleeDice: getDefenseNFlee(combatRole, skullIndex),
        },
        options: {
            obstacles: [],
            customs: [],
            other: []
        }
    }
}