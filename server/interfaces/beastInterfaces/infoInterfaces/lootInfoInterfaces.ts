import { Loot, SpecificLoot } from "../lootInterfaces"

export default interface LootInfo {
    lootnotes: string,
    lairLoot: Loot,
    carriedLoot: Loot,
    reagents: Reagent[],
    specificLoots: SpecificLoot[],
}

export interface Reagent {
    id: number,
    beastid: number,
    name: string,
    spell: string,
    difficulty: string,
    harvest: string,
    deleted: boolean
}
