import { RawMovement, Movement } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Strength } from "../../../interfaces/calculationInterfaces"
import { primaryCombatRoles } from "../../roleInfo/combatRoleInfo"

export function calculateMovements(movements: RawMovement[], combatpoints: number, mainRole: string) {
    return movements.map(movement => {
        const { id, beastid, role, type, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, roleid, allroles, adjustment = 0 } = movement

        const reformattedMovement: Movement = {
            id, beastid, role, type, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, roleid, allroles, adjustment,
            stroll: 0, walk: 0, jog: 0, run: 0, sprint: 0
        }

        return calculateMovement(reformattedMovement, combatpoints, mainRole)
    })
}

export default function calculateMovement(movement: Movement, combatpoints: number, mainRole: string): Movement {
    const { id, beastid, role, type, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, roleid, allroles, adjustment = 0 } = movement

    const specificScalingStrength = primaryCombatRoles[role].meleeCombatStats.movement

    const rolesToUse = role ? role : mainRole

    const roleScalingStrength = primaryCombatRoles[rolesToUse].meleeCombatStats.movement
    const scalingToUse = specificScalingStrength ? specificScalingStrength : roleScalingStrength

    let stroll = calculateSpeed(strollstrength ?? scalingToUse, combatpoints + adjustment, 0)
    let walk = calculateSpeed(walkstrength ?? scalingToUse, combatpoints + adjustment, stroll)
    let jog = calculateSpeed(jogstrength ?? scalingToUse, combatpoints + adjustment, walk, 2)
    let run = calculateSpeed(runstrength ?? scalingToUse, combatpoints + adjustment, jog, 2)
    let sprint = calculateSpeed(sprintstrength ?? scalingToUse, combatpoints + adjustment, run, 2)

    return {
        id, beastid, roleid, allroles,
        stroll, walk, jog, run, sprint,
        adjustment, role,
        strollstrength, walkstrength, jogstrength, runstrength, sprintstrength,
        type: type ?? 'Land'
    }
}

function calculateSpeed(strength: Strength, points: number, baseSpeed: number, multiplier: number = 1): number {
    const scaling = {
        majSt: 3 * multiplier,
        minSt: 2.5 * multiplier,
        none: 2.5 * multiplier,
        minWk: 2 * multiplier,
        majWk: 1 * multiplier
    }

    const bonus = {
        majSt: .075,
        minSt: .05,
        none: 0,
        minWk: .025,
        majWk: .01
    }

    if (!baseSpeed) { baseSpeed = 0 }

    if (strength === 'x') {
        return 0
    } else if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        baseSpeed += scaling.majSt
    } else if (strength === 'noneWk') {
        baseSpeed += scaling.majWk
    } else if (strength === 'none' || !strength) {
        baseSpeed += scaling.none
    } else {
        baseSpeed += (scaling[strength] + (bonus[strength] * points))
    }

    return roundToNearestTwoPointFive(baseSpeed)
}

function roundToNearestTwoPointFive(x: number) {
    return Math.ceil(x / 2.5) * 2.5
}