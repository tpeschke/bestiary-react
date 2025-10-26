import { ItemsToRequest, LootAlms, LootItem, LootObject, lootScalingOptions, LootScroll, ReturnedAlmScript, ReturnedGenericLoot, ReturnedLoot, ScrollsToRequest } from "../interfaces/lootInterfaces"

import rollDice from "../../../utilities/diceRoller"
import { generateEnchantedItem, generateItemChance, generateScriptFavor, generateScriptNumber, generateScrollPower, generatePotion, generateTalisman, generateCoin } from "./generateLoot"

export function getGenericLoot(timesToRoll: number = 1, beastLoot: LootObject, monsterMaxPoints: number, coinMultiplier: number): ReturnedLoot[] {
    let genericLoot: ReturnedLoot[] = []

    const { copper, alms } = beastLoot

    copper ? genericLoot = [...genericLoot, ...formatCoinage(monsterMaxPoints, timesToRoll, copper, coinMultiplier)] : null
    alms ? genericLoot = [...genericLoot, ...formatAlmScripts(monsterMaxPoints, timesToRoll, alms)] : null

    return genericLoot
}

interface basicLootRequest {
    numberOfItems: number
}

export interface LootRequest {
    enchanted?: basicLootRequest,
    potions?: basicLootRequest,
    talismans?: basicLootRequest,
    items?: ItemsToRequest[],
    scrolls?: ScrollsToRequest[]
}

export function getLootFromReliquary(timesToRoll: number = 1, beastLoot: LootObject, monsterMaxPoints: number, enchantedMultiplier: number, itemMultiplier: number): LootRequest {
    let lairLootRequestBody: LootRequest = {}
    const { enchanted, potion, items, scrolls, talisman } = beastLoot

    if (enchanted) {
        const numberOfItems = formatEnchantedForRequest(monsterMaxPoints, timesToRoll, enchanted, enchantedMultiplier)
        numberOfItems ? lairLootRequestBody.enchanted = { numberOfItems } : null
    }
    if (scrolls) {
        const scrollsToRequest = formatScrollsForRequest(monsterMaxPoints, timesToRoll, scrolls)
        scrollsToRequest && scrollsToRequest.length > 0 ? lairLootRequestBody.scrolls = scrollsToRequest : null
    }
    if (potion) {
        const numberOfItems = formatPotionsForRequest(monsterMaxPoints, timesToRoll, potion)
        numberOfItems ? lairLootRequestBody.potions = { numberOfItems } : null

    }
    if (talisman) {
        const numberOfItems = formatTalismansForRequest(monsterMaxPoints, timesToRoll, talisman)
        numberOfItems ? lairLootRequestBody.talismans = { numberOfItems } : null
    }
    if (items) {
        const itemsToRequest = formatItemsForRequest(monsterMaxPoints, timesToRoll, items, itemMultiplier)
        itemsToRequest && itemsToRequest.length > 0 ? lairLootRequestBody.items = itemsToRequest : null
    }

    return lairLootRequestBody
}

function formatEnchantedForRequest(monsterMaxPoints: number, timesToRoll: number, enchanted: lootScalingOptions, multiplier: number): number {
    let numberOfItems = 0
    if (enchanted) {
        const baseChance = generateEnchantedItem(monsterMaxPoints, enchanted) * multiplier

        Array.from(Array(timesToRoll).keys()).forEach(_ => {
            const enchantedChance = Math.floor(Math.random() * 101);
            if (baseChance >= enchantedChance) {
                numberOfItems++
            }
        })
    }
    return numberOfItems
}

function formatScrollsForRequest(monsterMaxPoints: number, timesToRoll: number, scrolls: LootScroll[]): ScrollsToRequest[] {
    let scrollsArray: ScrollsToRequest[] = []
    if (scrolls.length > 0) {
        Array.from(Array(timesToRoll).keys()).forEach(_ => {
            scrolls.forEach((scroll: LootScroll) => {
                const numberOfScrolls = generateScriptNumber(monsterMaxPoints, scroll.number)
                if (numberOfScrolls > 0) {
                    const power = generateScrollPower(monsterMaxPoints, scroll.power)
                    scrollsArray.push({ numberOfScrolls, power })
                }
            })
        })
    }

    return scrollsArray
}

function formatPotionsForRequest(monsterMaxPoints: number, timesToRoll: number, potions: lootScalingOptions) {
    let numberOfItems = 0
    if (potions) {
        Array.from(Array(timesToRoll).keys()).forEach(_ => {
            numberOfItems += Math.min(generatePotion(monsterMaxPoints, potions) * 2, 4)
        })
    }

    return numberOfItems
}

function formatTalismansForRequest(monsterMaxPoints: number, timesToRoll: number, talismans: lootScalingOptions): number {
    let numberOfItems = 0
    if (talismans) {
        Array.from(Array(timesToRoll).keys()).forEach(_ => {
            numberOfItems += Math.min(generateTalisman(monsterMaxPoints, talismans) * 2, 4)
        })
    }

    return numberOfItems
}

function formatItemsForRequest(monsterMaxPoints: number, timesToRoll: number, items: LootItem[], multiplier: number): ItemsToRequest[] {
    let itemArray: ItemsToRequest[] = []
    if (items.length > 0) {
        Array.from(Array(timesToRoll).keys()).forEach(_ => {

            items.forEach((item: LootItem) => {
                const { number, chance, detail, category, rarity, wear } = item
                const baseChance = generateItemChance(monsterMaxPoints, chance) * multiplier

                const rarityNumberDictionary: {[key: string]: number} = {
                    'C': 1,
                    'U': 2,
                    'R': 3,
                    'L': 4
                }

                Array.from(Array(number).keys()).forEach(_ => {
                    const itemChange = Math.floor(Math.random() * 101)
                    if (itemChange <= baseChance) {
                        itemArray.push({ detail, category, rarity: rarityNumberDictionary[rarity], wear: rollDice(wear) })
                    }
                })
            })
        })
    }

    return itemArray
}

function formatAlmScripts(monsterMaxPoints: number, timesToRoll: number, alms: LootAlms[]): ReturnedLoot[] {
    let almStrings: ReturnedAlmScript[] = []
    if (alms.length > 0) {
        Array.from(Array(timesToRoll).keys()).forEach(_ => {
            alms.forEach((alm: LootAlms) => {
                const number = generateScriptNumber(monsterMaxPoints, alm.number)
                if (number > 0) {
                    const favor = generateScriptFavor(monsterMaxPoints, alm.favor)
                    almStrings.push({type: 'alms', script: `${number} alm script${number > 1 ? 's' : ''} (${favor} Favor)`})
                }
            })
        })
    }

    return almStrings
}

function formatCoinage(monsterMaxPoints: number, timesToRoll: number, copper: lootScalingOptions, coinMultiplier: number): ReturnedLoot[] {
    let coinNumber = [0, 0, 0]
    let coinageArray: ReturnedGenericLoot[] = []
    if (copper) {
        for (let i = 0; i < timesToRoll; i++) {
            const coinArray: number[] = generateCoin(monsterMaxPoints, copper);
            coinNumber[0] += coinArray[0]
            coinNumber[1] += coinArray[1]
            coinNumber[2] += coinArray[2]
        }

        if (coinNumber[0] > 0) {
            coinageArray.push({type: 'generic', info: Math.ceil(coinNumber[0] * coinMultiplier) + " gc in coin"})
        }
        if (coinNumber[1] > 0) {
            coinageArray.push({type: 'generic', info: Math.ceil(coinNumber[1] * coinMultiplier) + " sc in coin"})
        }
        if (coinNumber[2] > 0) {
            coinageArray.push({type: 'generic', info: Math.ceil(coinNumber[2] * coinMultiplier) + " cc in coin"})
        }
    }

    return coinageArray
}