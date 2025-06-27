import { Scenario, Folklore, TablesObject } from "../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { BeastType, ClimateObject, Variant, LocationObject } from "../../../common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import { Role } from "../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import { ConflictObject } from "../../../common/interfaces/beast/infoInterfaces/socialInfo";
import { SpecificLoot, Loot } from "../lootInterfaces";

export interface upsertParameters {
    roles: Role[],
    types: BeastType[],
    climates: ClimateObject,
    conflicts: ConflictObject,
    skills: Skill[],
    movements: Movement[],
    variants: Variant[],
    specificLoots: SpecificLoot[],
    pleroma: Pleroma[],
    locationalVitalities: LocationVitality[],
    locations: LocationObject,
    artistInfo: ArtistObject,
    scenarios: Scenario[],
    folklores: Folklore[],
    casting: Casting,
    deletedSpells: number[],
    spells: Spell[],
    obstacles: Obstacle[],
    challenges: Challenge[],
    tables: TablesObject,
    lairLoot: Loot,
    carriedLoot: Loot,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}