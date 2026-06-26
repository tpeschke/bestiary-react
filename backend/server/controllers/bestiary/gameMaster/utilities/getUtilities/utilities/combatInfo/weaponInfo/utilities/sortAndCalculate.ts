import { RawCombatStat, AttackStats, BonfireDefenseInfo, AttackReference, SpellReference, BonfireWeaponInfo, SwarmReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "@bestiary/common/utilities/formatting/formatting"
import { CalculateCombatStatsReturn, calculateBonfireAttackInfo, calculateBonfireDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"
import { buildSystemSpecificInfo } from "../../../../../formatUtilities/getSystemSpecificTerminologies"
import getDamage from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/attackUtilities/getDamage"
import resolveAttackSystemInfo from "./resolveAttackSystemInfo"

export default function calculateCombatStats(combatStats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): CalculateCombatStatsReturn {
    let defenses: BonfireDefenseInfo[] = []
    let attacks: AttackStats[] = []
    combatStats.forEach(stats => {
        calculateSingleCombatInfo(stats, defenses, attacks, size, skullIndex, mainRole, gearCache)
    })

    return {
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: BonfireDefenseInfo[], attacks: AttackStats[], size: Size, skullIndex: number, mainRole: string, gearCache: any | undefined): void {
    const { id, beastid, roleid, info, info_hm, attackinfo, attackinfo_hm, addsizemod, tdr, swarmbonus, showonlydefenses, weaponname: chosenName, armor, shield, weapon,
        eua, isspecial: isSpecial, slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage,
        role, oldid: oldID, attackid, weapontype: weaponType, dradjust, reference, attackrole, tactic, situation, spellid, damagetype
    } = stats

    const roleToUse = role ?? mainRole
    const damageType = damagetype ?? getDamageType(slashingDamage, crushingDamage, piercingDamage)

    if (roleToUse) {
        defenses.push({
            ...calculateBonfireDefenseInfo(
                {
                    id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: chosenName, info
                },
                skullIndex, roleToUse, addsizemod, size, dradjust
            ),
            system: 'Bonfire',
            info: buildSystemSpecificInfo(info),
            overAllIndex: defenses.length,
            id,
            oldID,
            scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: chosenName, addsizemod,
                drAdjust: dradjust
             }
        })
    }

    if (!showonlydefenses && roleToUse) {
        const attackInfoValue = resolveAttackSystemInfo({ info, info_hm, attackinfo, attackinfo_hm })

        if (reference) {
            attacks.push({
                id: attackid,
                infoType: 'reference',
                system: 'Bonfire',
                overAllIndex: attacks.length,
                roleid: roleid ?? attackrole,
                tactic, reference, situation
            } as AttackReference)
        } else if (spellid) {
            attacks.push({
                id: attackid,
                infoType: 'spell',
                overAllIndex: attacks.length,
                roleid: roleid ?? attackrole,
                spellid, situation,
            } as SpellReference)
        } else if (chosenName && chosenName.substring(0, 11) === "Swarm Bonus") {
            attacks.push({
                system: "Bonfire",
                infoType: 'swarm',
                id: attackid,
                oldID: id ?? oldID,
                beastId: beastid,
                roleid,
                name: chosenName,
                swarmbonus,
                damage: getDamage('no', false, 'Swarm', roleToUse, skullIndex, 'Bonfire'),
                overAllIndex: attacks.length
            } as SwarmReference)
        } else {
            attacks.push({
                ...calculateBonfireAttackInfo(
                    { beastid, roleid, swarmbonus, name: chosenName, weapon, isSpecial, damageType, weaponType },
                    skullIndex, roleToUse, addsizemod, size, gearCache
                ),
                info: attackInfoValue,
                situation, tactic,
                oldID: id ?? oldID,
                overAllIndex: attacks.length,
                id: attackid,
                type: 'Bonfire',
                infoType: 'weapon',
                scalingInfo: { swarmbonus, name: chosenName, weapon, weaponType, damageType, addsizemod }
            } as BonfireWeaponInfo)
        }
    }
}
