import { Loot, SpecificLoot } from "../../../../server/interfaces/lootInterfaces";

export default interface LootInfo {
    lootnotes: string,
    lairLoot: Loot,
    carriedLoot: Loot,
    pleroma: Pleroma[],
    specificLoots: SpecificLoot[],
}

export interface Pleroma {
    id: number,
    beastid: number,
    name: string,
    spell: string,
    positionModifier: string,
    harvestDifficulty: string,
    deleted: boolean
}
