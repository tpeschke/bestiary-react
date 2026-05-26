import { AttackStats } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export function shiftAttackOrder(overAllIndex: number, overAllIndexToMoveTo: number, rawAttacks: AttackStats[]) {
    const attackToMove = { ...rawAttacks[overAllIndex] }
    if (overAllIndex < overAllIndexToMoveTo) {
        // down
        return rawAttacks.reduce(resortAttacksDown(attackToMove, overAllIndex, overAllIndexToMoveTo), [])
    } else if (overAllIndex > overAllIndexToMoveTo) {
        // up
        return rawAttacks.reduce(resortAttacksUp(attackToMove, overAllIndex, overAllIndexToMoveTo), [])
    }
}

function resortAttacksDown(attackToMove: AttackStats, overAllIndex: number, overAllIndexToMoveTo: number) {
    return (attacks: AttackStats[], attack: AttackStats): AttackStats[] => {
        const originalOverAllIndex = attack.overAllIndex
        if (originalOverAllIndex !== overAllIndex) {
            attacks.push({
                ...attack,
                overAllIndex: attacks.length
            })
        }
        if (originalOverAllIndex === overAllIndexToMoveTo) {
            attacks.push({
                ...attackToMove,
                overAllIndex: attacks.length
            })
        }

        return attacks
    }
}

function resortAttacksUp(attackToMove: AttackStats, overAllIndex: number, overAllIndexToMoveTo: number) {
    return (attacks: AttackStats[], attack: AttackStats): AttackStats[] => {
        const originalOverAllIndex = attack.overAllIndex
        if (originalOverAllIndex === overAllIndexToMoveTo) {
            attacks.push({
                ...attackToMove,
                overAllIndex: attacks.length
            })
        }
        if (originalOverAllIndex !== overAllIndex) {
            attacks.push({
                ...attack,
                overAllIndex: attacks.length
            })
        }

        return attacks
    }
}