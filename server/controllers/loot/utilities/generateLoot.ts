import rollDice from "../../../utilities/diceRoller"
import { lootScalingOptions } from "../interfaces/lootInterfaces"
import { coinScaling, enchantedItemChanceScaling, uniqueItemChanceScaling, talismanPotionScrollAlmScriptScaling, spellPointsFavorScaling } from "./lootTables"

export function generateEnchantedItem(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'

    if (isNonScaling) {
        return enchantedItemChanceScaling[frequency]
    } else {
        return (monsterMaxPoints + 1) * enchantedItemChanceScaling[frequency]
    }
}

export function generateScriptNumber(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const scrollAmount: number = rollDice('1d8') - 2
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'
    const monsterAmountModifier: number = 4 - (Math.floor(monsterMaxPoints / 5))

    if (isNonScaling) {
        return Math.max(scrollAmount + talismanPotionScrollAlmScriptScaling[frequency], 0)
    } else {
        return Math.max((scrollAmount + talismanPotionScrollAlmScriptScaling[frequency]) - monsterAmountModifier, 0)
    }
}

export function generateScriptFavor(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const favorpAmount: number = rollDice('1d3')
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'
    const monsterAmountModifier: number = Math.floor(monsterMaxPoints / 5)

    if (isNonScaling) {
        return Math.max(Math.floor(favorpAmount * spellPointsFavorScaling[frequency]), 1)
    } else {
        return Math.max((Math.floor(favorpAmount * spellPointsFavorScaling[frequency])) + monsterAmountModifier, 1)
    }
}

export function generateScrollNumber(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const scrollAmount: number = rollDice('1d8') - 3
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'
    const monsterAmountModifier: number = 4 - (Math.floor(monsterMaxPoints / 5))

    if (isNonScaling) {
        return Math.max(scrollAmount + talismanPotionScrollAlmScriptScaling[frequency], 0)
    } else {
        return Math.max((scrollAmount + talismanPotionScrollAlmScriptScaling[frequency]) - monsterAmountModifier, 0)
    }
}

export function generateScrollPower(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const spAmount: number = Math.floor(Math.random() * (10 - 5 + 1) + 5);
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'

    if (isNonScaling) {
        return Math.max(Math.floor(spAmount * spellPointsFavorScaling[frequency]), 5)
    } else {
        return Math.max((Math.floor(spAmount * spellPointsFavorScaling[frequency])) + monsterMaxPoints, 5)
    }
}

export function generatePotion(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const talismanAmount: number = rollDice('1d8') - 4
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'
    const monsterModifier: number = 4 - (Math.floor(monsterMaxPoints / 5))

    if (isNonScaling) {
        return Math.max(talismanAmount + talismanPotionScrollAlmScriptScaling[frequency], 0)
    } else {
        return Math.max((talismanAmount + talismanPotionScrollAlmScriptScaling[frequency]) - monsterModifier, 0)
    }
}

export function generateTalisman(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const talismanAmount: number = rollDice('1d8') - 4
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'
    const monsterModifier: number = 4 - (Math.floor(monsterMaxPoints / 5))

    if (isNonScaling) {
        return Math.max(talismanAmount + talismanPotionScrollAlmScriptScaling[frequency], 0)
    } else {
        return Math.max((talismanAmount + talismanPotionScrollAlmScriptScaling[frequency]) - monsterModifier, 0)
    }
}

export function generateItemChance(monsterMaxPoints: number, frequency: lootScalingOptions): number {
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'

    if (isNonScaling) {
        return uniqueItemChanceScaling[frequency]
    } else {
        return (monsterMaxPoints + 1) * uniqueItemChanceScaling[frequency]
    }
}

export function generateCoin(monsterMaxPoints: number, frequency: lootScalingOptions): number[] {
    const coinAmount: number = (rollDice('1d6') + rollDice('1d6')) * rollDice('1d20')
    const isNonScaling: boolean = frequency === 'e' || frequency === 'f' || frequency === 'g'

    let finalCoinAmount: number = 0
    if (isNonScaling) {
        finalCoinAmount = coinAmount * coinScaling[frequency]
    } else {
        finalCoinAmount = coinAmount * (monsterMaxPoints + 1) * coinScaling[frequency]
    }

    const gold = Math.floor(finalCoinAmount / 100)
    const silver = Math.floor(finalCoinAmount / 10) - (gold * 10)
    const copper = finalCoinAmount - (gold * 100) - (silver * 10)

    return [gold, silver, copper]
}