import { RawCombatStat, AttackInfo, DefenseInfo } from "../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "../../../../../../../../common/utilities/formatting/formatting"
import { CalculateCombatStatsReturn, calculateStatWithFormatting, calculateAttackInfo, calculateDefenseInfo } from "../../../../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"

export default function calculateAttacksAndDefenses(attackStats: RawCombatStat[], defenseStats: RawCombatStat[], combatPoints: number, mainRole: string, size: Size): CalculateCombatStatsReturn {
    const firstCombatIndex = attackStats[0]
    const initiative = firstCombatIndex ? firstCombatIndex.initiative : 'minWk'
    const roleToUse = firstCombatIndex && firstCombatIndex.role ? firstCombatIndex.role : mainRole

    return {
        initiative: calculateStatWithFormatting(initiative, 'initiative', roleToUse, combatPoints),
        attacks: calculateAttacks(attackStats, combatPoints, mainRole),
        defenses: calculateDefenses(defenseStats, size, combatPoints, mainRole)
    }
}

function calculateAttacks(stats: RawCombatStat[], mainCombatPoints: number, mainRole: string): AttackInfo[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info, adjustment, swarmbonus, rangedistance: rangeIncrement, recovery, measure, weaponname: chosenName, weapon, isspecial, attack,
            slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, combatpoints: combatPoints, oldID, attackid, situation,
            tactic, reference, attackrole, weapontype
        } = stat

        const roleToUse = role ? role : mainRole
        const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, roleToUse)
        const pointsToUse = combatPoints ? combatPoints : mainCombatPoints

        if (reference) {
            return {
                id: attackid,
                infoType: 'reference',
                overAllIndex: index,
                roleid: roleid ? roleid : attackrole,
                tactic, reference, situation
            }
        } else {
            return {
                ...calculateAttackInfo({ beastid, roleid, info, swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType, adjustment, weapontype }, pointsToUse, roleToUse),
                situation, tactic,
                oldID: id ? id : oldID,
                overAllIndex: index,
                id: attackid,
                infoType: 'weapon',
                scalingInfo: { swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, damageType, adjustment, weapontype }
            }
        }
    })
}

function calculateDefenses(stats: RawCombatStat[], size: Size, mainCombatPoints: number, mainRole: string): DefenseInfo[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangeddefense: cover, armor, shield, eua, alldefense, flanks,
            andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry, role,
            combatpoints: combatPoints, oldID, defenseid, defensename
        } = stat

        const roleToUse = role ? role : mainRole
        const pointsToUse = combatPoints ? combatPoints : mainCombatPoints

        return {
            ...calculateDefenseInfo({ beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: defensename, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, info }, pointsToUse, roleToUse, addsizemod, size),
            overAllIndex: index,
            oldID: id ? id : oldID,
            defensename,
            id: defenseid,
            scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: defensename, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, addsizemod }
        }
    })
}