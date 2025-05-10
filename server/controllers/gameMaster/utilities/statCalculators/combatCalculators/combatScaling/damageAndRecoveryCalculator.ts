
import { Strength } from "../../../../../../interfaces/beastInterfaces/beastInterfaces";
import { IsSpecial, DamageType } from "../../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";

import { calculateStat } from "./combatCalculator";
import { DiceObject } from "./combatScaling";

interface Return {
    damage: string,
    recovery: number
}

export function calculateDamageAndRecovery(slashingDamageScalingStrength: Strength, crushingDamageScalingStrength: Strength, piercingDamageScalingStrength: Strength, recoveryScalingStrength: Strength, role: string, points: number, isspecial: IsSpecial, damageType: DamageType): Return {
    if (isspecial) { return {damage: '*', recovery: 10} }

    let setDamageScaling;
    if (slashingDamageScalingStrength) {
        setDamageScaling = slashingDamageScalingStrength
    } else if (crushingDamageScalingStrength) {
        setDamageScaling = crushingDamageScalingStrength
    } else if (piercingDamageScalingStrength) {
        setDamageScaling = piercingDamageScalingStrength
    }

    const modifiedStat = Math.ceil(calculateStat(setDamageScaling, 'damage', role, points))

    let diceObject: DiceObject;
    if (damageType === 'S') {
        diceObject = calculateSlashingDice(modifiedStat)
    } else if (damageType === 'P') {
        diceObject = calculatePiercingDice(modifiedStat)
    } else {
        diceObject = calculateCrushingDice(modifiedStat)
    }

    let { damage, recovery } = createDiceStringAndRecovery(diceObject)

    if (isspecial === 'kinda') {
        damage += '*'
    }

    recovery += calculateStat(recoveryScalingStrength, 'recovery', role, points)

    return { damage, recovery }
}

function calculateSlashingDice(modifiedStat: number): DiceObject {
    let diceObject: DiceObject = {
        d3: 0,
        d4: 0,
        d6: 0,
        d8: 0,
        d10: 0,
        d12: 0,
        d20: 0,
    }

    diceObject.d4 += Math.floor(modifiedStat / 2)

    let leftover = modifiedStat % 2
    if (leftover === 1) {
        diceObject.d3 += 1
    }

    return diceObject
}

function calculatePiercingDice(modifiedStat: number): DiceObject {
    let diceObject: DiceObject = {
        d3: 0,
        d4: 0,
        d6: 0,
        d8: 0,
        d10: 0,
        d12: 0,
        d20: 0,
    }

    diceObject.d8 += Math.floor(modifiedStat / 4)

    let leftover = modifiedStat % 4
    if (leftover === 1) {
        diceObject.d3 += 1
    } else if (leftover === 2) {
        diceObject.d4 += 1
    } else if (leftover === 3) {
        diceObject.d6 += 1
    }

    return diceObject
}

function calculateCrushingDice(modifiedStat: number): DiceObject {
    let diceObject: DiceObject = {
        d3: 0,
        d4: 0,
        d6: 0,
        d8: 0,
        d10: 0,
        d12: 0,
        d20: 0,
        damageMod: 0
    }

    if (modifiedStat <= 1) {
        diceObject.d4 += 1
    } else if (modifiedStat === 2) {
        diceObject.d6 += 1
    } else if (modifiedStat === 3) {
        diceObject.d8 += 1
    } else if (modifiedStat === 4) {
        diceObject.d10 += 1
    } else if (modifiedStat === 5) {
        diceObject.d12 += 1
    } else {
        diceObject.d20 += 1
        diceObject.damageMod = Math.floor(modifiedStat) - 6
    }

    return diceObject
}

function createDiceStringAndRecovery(diceObject: DiceObject): Return {
    const { d3, d4, d6, d8, d10, d12, d20, damageMod } = diceObject

    let damage = ''
    let recovery = 0

    if (d3 > 0) {
        damage += `${d3}d3!`
        recovery += d3 * getRecoveryFromDiceSize('d3')
    }
    if (d4 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d4}d4!`
        recovery += d4 * getRecoveryFromDiceSize('d4')
    }
    if (d6 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d6}d6!`
        recovery += d6 * getRecoveryFromDiceSize('d6')
    }
    if (d8 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d8}d8!`
        recovery += d8 * getRecoveryFromDiceSize('d8')
    }
    if (d10 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d10}d10!`
        recovery += d10 * getRecoveryFromDiceSize('d10')
    }
    if (d12 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d12}d12!`
        recovery += d12 * getRecoveryFromDiceSize('d12')
    }
    if (d20 > 0) {
        damage += ` ${damage !== '' ? '+' : ''}${d20}d20!`
        recovery += d20 * getRecoveryFromDiceSize('d20')
    }

    if (damageMod) {
        damage += ` +${damageMod}`
    }

    return { damage, recovery }
}

function getRecoveryFromDiceSize(diceSize: string): number {
    const diceRecoveryDictionary = {
        d3: 2,
        d4: 3,
        d6: 4,
        d8: 5,
        d10: 6,
        d12: 7,
        d20: 11,
    }
    return diceRecoveryDictionary[diceSize]
}