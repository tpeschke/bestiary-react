import { SystemOption } from "../../../../interfaces/beast/beast"

export default function calculateRollUnderTrauma(
    skullIndex: number,
    system: SystemOption
): number {
    if (system === 'HackMaster') {
        return getRollUnderTrauma(skullIndex, [1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11, 11, 11, 12, 12, 13, 13, 14, 14, 14, 15, 15, 16, 16, 17, 17, 17, 18, 18])
    }

    return getRollUnderTrauma(skullIndex, [-8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36])
}

function getRollUnderTrauma(skullIndex: number, rollUnderTraumaDictionary: number[]): number {
    if (skullIndex < 0) {
        return rollUnderTraumaDictionary[0]
    }
    if (skullIndex > rollUnderTraumaDictionary.length) {
        return rollUnderTraumaDictionary[rollUnderTraumaDictionary.length - 1]
    }
    return rollUnderTraumaDictionary[skullIndex]
}