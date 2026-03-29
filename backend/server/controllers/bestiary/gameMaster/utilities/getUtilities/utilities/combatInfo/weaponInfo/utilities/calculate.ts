import { RawCombatStat, AttackInfo, BonfireDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "@bestiary/common/utilities/formatting/formatting"
import { calculateBonfireAttackInfo, calculateBonfireDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"

interface CalculateCombatStatsReturn {
    attacks: AttackInfo[],
    defenses: BonfireDefenseInfo[]
}

export default function calculateAttacksAndDefenses(attackStats: RawCombatStat[], defenseStats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): CalculateCombatStatsReturn {
    return {
        attacks: calculateAttacks(attackStats, skullIndex, mainRole, size, gearCache),
        defenses: calculateDefenses(defenseStats, size, skullIndex, mainRole)
    }
}

function calculateAttacks(stats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): AttackInfo[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info, swarmbonus, weaponname: chosenName, weapon, isspecial: isSpecial,
            slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, oldID, attackid, situation,
            tactic, reference, attackrole, weapontype, damagetype, addsizemod, spellid
        } = stat

        const roleToUse = role ? role : mainRole
        const damageType = damagetype ?? getDamageType(slashingDamage, crushingDamage, piercingDamage)

        if (reference) {
            return {
                id: attackid,
                infoType: 'reference',
                overAllIndex: index,
                roleid: roleid ?? attackrole,
                tactic, reference, situation
            }
        } else if (spellid) {
            return {
                id: attackid,
                infoType: 'spell',
                overAllIndex: index,
                roleid: roleid ?? attackrole,
                spellid, situation,
            }
        } else {
            return {
                ...calculateBonfireAttackInfo(
                    { beastid, roleid, info, swarmbonus, name: chosenName, weapon, isSpecial, damageType, weapontype },
                    skullIndex, roleToUse, addsizemod, size, gearCache
                ),
                situation, tactic,
                oldID: id ?? oldID,
                overAllIndex: index,
                id: attackid,
                type: 'Bonfire',
                infoType: 'weapon',
                scalingInfo: { swarmbonus, name: chosenName, weapon, weapontype, damageType, addsizemod }
            }
        }
    })
}

function calculateDefenses(stats: RawCombatStat[], size: Size, skullIndex: number, mainRole: string): BonfireDefenseInfo[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info, addsizemod, tdr, swarmbonus, armor, shield, eua, role,
            oldID, defenseid, defensename
        } = stat

        const roleToUse = role ? role : mainRole

        return {
            ...calculateBonfireDefenseInfo(
                { beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: defensename, info },
                skullIndex, roleToUse, addsizemod, size),
            system: 'Bonfire',
            overAllIndex: index,
            oldID: id ? id : oldID,
            defensename,
            id: defenseid,
            scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: defensename, addsizemod }
        }
    })
}