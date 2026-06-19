import { RawCombatStat, AttackStats, BonfireDefenseInfo, AttackReference, SpellReference, BonfireWeaponInfo, SwarmReference } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size, SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "@bestiary/common/utilities/formatting/formatting"
import { calculateBonfireAttackInfo, calculateBonfireDefenseInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"
import { buildSystemSpecificInfo } from "../../../../../formatUtilities/getSystemSpecificTerminologies"
import getDamage from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/attackUtilities/getDamage"

interface CalculateCombatStatsReturn {
    attacks: AttackStats[],
    defenses: BonfireDefenseInfo[]
}

export default function calculateAttacksAndDefenses(attackStats: RawCombatStat[], defenseStats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): CalculateCombatStatsReturn {
    return {
        attacks: calculateAttacks(attackStats, skullIndex, mainRole, size, gearCache),
        defenses: calculateDefenses(defenseStats, size, skullIndex, mainRole)
    }
}

function calculateAttacks(stats: RawCombatStat[], skullIndex: number, mainRole: string, size: Size, gearCache: any | undefined): AttackStats[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info: info_bonfire, info_hm, attackinfo, attackinfo_hm, swarmbonus, weaponname: chosenName,
            weapon, isspecial: isSpecial,
            slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, oldid,
            attackid, situation,
            tactic, reference, attackrole, weapontype: weaponType, damagetype, addsizemod, spellid
        } = stat

        const roleToUse = role ? role : mainRole
        const damageType = damagetype ?? getDamageType(slashingDamage, crushingDamage, piercingDamage)

        let info: SystemInfoValue;

        if (attackinfo) {
            info = attackinfo_hm ? [attackinfo, undefined, attackinfo_hm] : buildSystemSpecificInfo(attackinfo)
        } else {
            info = info_hm ? [info_bonfire ?? '', undefined, info_hm ?? ''] : buildSystemSpecificInfo(info_bonfire)
        }

        if (reference) {
            return {
                id: attackid,
                infoType: 'reference',
                system: 'Bonfire',
                overAllIndex: index,
                roleid: roleid ?? attackrole,
                tactic, reference, situation
            } as AttackReference
        } else if (spellid) {
            return {
                id: attackid,
                infoType: 'spell',
                overAllIndex: index,
                roleid: roleid ?? attackrole,
                spellid, situation,
            } as SpellReference
        } else if (chosenName && chosenName.substring(0, 11) === "Swarm Bonus") {
            return {
                system: "Bonfire",
                infoType: 'swarm',
                id: attackid,
                oldID: id ?? oldid,
                beastId: beastid,
                roleid,
                name: chosenName,
                swarmbonus,
                damage: getDamage('no', false, 'Swarm', roleToUse, skullIndex, 'Bonfire'),
                overAllIndex: index
            } as SwarmReference
        } else {
            return {
                ...calculateBonfireAttackInfo(
                    { beastid, roleid, info_bonfire, swarmbonus, name: chosenName, weapon, isSpecial, damageType, weaponType },
                    skullIndex, roleToUse, addsizemod, size, gearCache
                ),
                info,
                situation, tactic,
                oldID: id ?? oldid,
                overAllIndex: index,
                id: attackid,
                type: 'Bonfire',
                infoType: 'weapon',
                scalingInfo: { swarmbonus, name: chosenName, weapon, weaponType, damageType, addsizemod }
            } as BonfireWeaponInfo
        }
    })
}

function calculateDefenses(stats: RawCombatStat[], size: Size, skullIndex: number, mainRole: string): BonfireDefenseInfo[] {
    return stats.map((stat, index) => {
        const { id, beastid, roleid, info, addsizemod, tdr, swarmbonus, armor, shield, eua, role,
            oldid, defensename, dradjust
        } = stat

        const roleToUse = role ? role : mainRole

        return {
            ...calculateBonfireDefenseInfo(
                { beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: defensename, info, dradjust },
                skullIndex, roleToUse, addsizemod, size, dradjust),
            system: 'Bonfire',
            info: buildSystemSpecificInfo(info),
            overAllIndex: index,
            oldID: oldid,
            defensename,
            id,
            scalingInfo: {
                swarmbonus, armor, shield, eua, tdr, name: defensename, addsizemod,
                drAdjust: dradjust
            }
        }
    })
}