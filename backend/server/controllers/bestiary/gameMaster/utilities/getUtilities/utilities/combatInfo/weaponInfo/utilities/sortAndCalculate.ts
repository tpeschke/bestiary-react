import { RawCombatStat, DefenseInfo, AttackInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "@bestiary/common/utilities/formatting/formatting"
import { CalculateCombatStatsReturn, calculateDefenseInfo, calculateAttackInfo } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation"

export default function calculateCombatStats(combatStats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []
    combatStats.forEach(stats => {
        calculateSingleCombatInfo(stats, defenses, attacks, size, skullIndex, mainRole, gearCache)
    })

    return {
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], size: Size, skullIndex: number, mainRole: string, gearCache: any | undefined): void {
    const { id, beastid, roleid, info, addsizemod, tdr, swarmbonus, showonlydefenses, weaponname: chosenName, armor, shield, weapon, eua, isspecial: isSpecial,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, oldID, attackid
    } = stats

    const roleToUse = role ?? mainRole
    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage)

    if (roleToUse) {
        defenses.push({
            ...calculateDefenseInfo(
                {
                    id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: chosenName, info
                },
                skullIndex, roleToUse, addsizemod, size
            ),
            overAllIndex: defenses.length,
            oldID: id ?? oldID,
            scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: chosenName, addsizemod }
        })
    }

    if (!showonlydefenses && roleToUse) {
        attacks.push({
            ...calculateAttackInfo(
                {
                    beastid, roleid, info, swarmbonus, name: chosenName, weapon, isSpecial, damageType
                },
                skullIndex, roleToUse, addsizemod, size, gearCache
            ),
            oldID: id ?? oldID,
            overAllIndex: attacks.length,
            id: attackid,
            infoType: 'weapon',
            scalingInfo: { swarmbonus, name: chosenName, weapon, damageType, addsizemod }
        })
    }
}