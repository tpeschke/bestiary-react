import { Strength } from "../../../interfaces/calculationInterfaces"
import { ScalingObject } from "../combat/combatScaling"

export function calculateRankForSkill(points: number, strength: Strength, adjustment: number = 0): number {
    const scaling: ScalingObject = {
        majSt: 1.25,
        minSt: 1,
        minWk: .75,
        majWk: .5,
        none: 0
    }

    const base: ScalingObject = {
        majSt: 7,
        minSt: 5,
        minWk: 3,
        majWk: 1,
        none: 0
    }

    if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        return 5
    } else if (strength === 'noneWk') {
        return 0
    } else if (strength === 'none' || !strength) {
        return 3
    } else if (base[strength] && scaling[strength]) {
        return Math.ceil(base[strength] + (scaling[strength] * (points + adjustment)))
    } else {
        
        return Math.ceil(base.minWk + (scaling.minWk * (points + adjustment)))
    }
}