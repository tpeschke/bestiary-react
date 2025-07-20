import { RawCombatStat, DefenseInfo, AttackInfo } from "../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "../../../../../../../../common/utilities/formatting/formatting"
import { CalculateCombatStatsReturn, calculateStatWithFormatting, calculateDefenseInfo, calculateAttackInfo } from "../../../../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"

export default function calculateCombatStats(combatStats: RawCombatStat[], combatPoints: number, mainRole: string, size: Size): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []
    combatStats.forEach(stats => {
        calculateSingleCombatInfo(stats, defenses, attacks, size, combatPoints, mainRole)
    })

    const firstCombatIndex = combatStats[0]
    const initiative = firstCombatIndex ? firstCombatIndex.initiative : 'minWk'
    const roleToUse = firstCombatIndex && firstCombatIndex.role ? firstCombatIndex.role : mainRole

    return {
        initiative: calculateStatWithFormatting(initiative, 'initiative', roleToUse, combatPoints),
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], size: Size, mainCombatPoints: number, mainRole: string): void {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, showonlydefenses, recovery, measure, rangeddefense: cover, weaponname: chosenName,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, combatpoints: combatPoints, oldID, attackid
    } = stats

    const roleToUse = role ? role : mainRole
    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, roleToUse)
    const pointsToUse = combatPoints ? combatPoints : mainCombatPoints

    defenses.push({
        ...calculateDefenseInfo({ id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: chosenName, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, info }, pointsToUse, roleToUse, addsizemod, size),
        overAllIndex: defenses.length,
        oldID: id ? id : oldID,
        scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: chosenName, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, addsizemod }
    })

    if (!showonlydefenses) {
        attacks.push({
            ...calculateAttackInfo({ beastid, roleid, info, swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType, adjustment }, pointsToUse, roleToUse),
            oldID: id ? id : oldID,
            overAllIndex: attacks.length,
            id: attackid,
            scalingInfo: { swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, damageType, adjustment }
        })
    }
}