import { Role, UnsortedRole } from "../../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { sortTemplateRoles } from "../../../../utilities/sorts"

export async function getRoles(databaseConnection: any, beastId: number, beastName: string): Promise<Role[]> {
    const roles: UnsortedRole[] = await databaseConnection.beast.role.get(beastId)

    if (beastName.includes('Template')) {
        return roles.sort(sortTemplateRoles).map(formatUnsortedRoles)
    }

    return roles.map(formatUnsortedRoles)
}

function formatUnsortedRoles(unsortedRole: UnsortedRole): Role {
    const { id, name, role: combatrole, size, hash, attack, defense, secondaryrole: combatsecondary, combatpoints, fatigue, largeweapons, knockback, singledievitality, noknockback, rollundertrauma, 
        isincorporeal, weaponbreakagevitality, panic, stress, mental, skillpoints, skillrole, attack_skill, defense_skill, skillsecondary, socialpoints, socialrole, 
        socialsecondary, attack_conf, defense_conf, hasarchetypes, hasmonsterarchetypes } = unsortedRole

    return {
        id,
        generalInfo: {
            name, size, hash
        },
        combatInfo: {
            attack, defense, combatrole, combatsecondary, combatpoints, fatigue, largeweapons, knockback, singledievitality, noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality,
            initiative: '+20'
        },
        skillInfo: {
            panic, stress, mental, skillpoints, skillrole, attack_skill, defense_skill, skillsecondary
        },
        socialInfo: {
            socialpoints, socialrole, socialsecondary, attack_conf, defense_conf, 
            hasarchetypes, hasmonsterarchetypes
        }
    }
}