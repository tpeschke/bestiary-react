import { Strength } from "../../../interfaces/calculationInterfaces"

export function calculateRankForSkill(points: number, strength: Strength = 'minWk', adjustment: number = 0): number {
    const scaling = {
        majSt: 1.25,
        minSt: 1,
        minWk: .75,
        majWk: .5
    }

    const base = {
        majSt: 7,
        minSt: 5,
        minWk: 3,
        majWk: 1
    }

    if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        return 5
    } else if (strength === 'noneWk') {
        return 0
    } else if (strength === 'none' || !strength) {
        return 3
    } else {
        return Math.ceil(base[strength] + (scaling[strength] * (points + adjustment)))
    }
}