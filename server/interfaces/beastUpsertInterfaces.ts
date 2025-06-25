import { Movement, LocationVitality, AttackInfo, DefenseInfo } from "../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { BeastType, ClimateObject, LocationObject, Variant } from "../../common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import { Skill } from "../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import { ConflictObject } from "../../common/interfaces/beast/infoInterfaces/socialInfo";
import { Role } from "./catalogInterfaces";
import { SpecificLoot, Loot } from "./lootInterfaces";
import { Obstacle, Challenge } from "./skillInterfaces";

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