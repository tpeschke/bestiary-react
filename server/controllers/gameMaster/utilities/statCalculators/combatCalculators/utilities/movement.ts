import { Movement } from "../../../../../../interfaces/beastInterfaces/beastInterfaces";
import { RawMovement } from "../../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { primaryCombatRoles } from "../../roleInfo/combatRoleInfo";

export function calculateMovements(movements: RawMovement[], combatpoints: number, role: string) {
    const roleScalingStrength = primaryCombatRoles[role].meleeCombatStats.movement
    return movements.map(movement => calculateMovement(movement, combatpoints, roleScalingStrength))
}

function calculateMovement(movement: RawMovement, combatpoints: number, roleScalingStrength: string): Movement {
    const { id, beastid, type, strollstrength, walkstrength, jogstrength, runstrength, sprintstrength, roleid, allroles, adjustment = 0 } = movement

    let stroll = calculateSpeed(strollstrength ?? roleScalingStrength, combatpoints + adjustment, 0)
    let walk = calculateSpeed(walkstrength ?? roleScalingStrength, combatpoints + adjustment, stroll)
    let jog = calculateSpeed(jogstrength ?? roleScalingStrength, combatpoints + adjustment, walk, 2)
    let run = calculateSpeed(runstrength ?? roleScalingStrength, combatpoints + adjustment, jog, 2)
    let sprint = calculateSpeed(sprintstrength ?? roleScalingStrength, combatpoints + adjustment, run, 2)

    return {
        id, beastid, roleid, allroles,
        stroll, walk, jog, run, sprint,
        type: type ?? 'Land'
    }
}

function calculateSpeed(strength: string, points: number, baseSpeed: number, multiplier: number = 1): number {
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