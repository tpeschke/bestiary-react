import { SpecificLoot, Loot } from "../lootInterfaces"
import { Obstacle, Challenge } from "../skillInterfaces"
import GeneralInfo, { Folklore, Scenario, TablesObject } from './infoInterfaces/generalInfoInterfaces'
import PlayerSpecificInfo from './infoInterfaces/playerSpecificInfoInterfaces'
import ImageInfo, { ArtistObject } from './infoInterfaces/ImageInfoInterfaces'
import LinkedInfo, { ClimateObject, LocationObject, Type, Variant } from './infoInterfaces/linkedInfoInterfaces'
import RoleInfo, { Role } from './infoInterfaces/roleInfoInterfaces'
import CombatInfo, { CombatStat, LocationVitality, Movement } from './infoInterfaces/combatInfoInterfaces'
import SkillInfo, { Skill } from './infoInterfaces/skillInfoInterfaces'
import SocialInfo, { ConflictObject } from './infoInterfaces/socialInfo'
import LootInfo, { Reagent } from './infoInterfaces/lootInfoInterfaces'
import CastingInfo, { Casting, Spell } from './infoInterfaces/castingInfo'
import { Encounter } from "../encounterInterfaces"

export type Strength = 'majSt' | 'minSt' | 'minWk' | 'majWk' | 'one' | 'noneStr' | 'noneWk' | 'none' | 'x'

export interface Beast {
    id: number,
    patreon: number,
    canplayerview: boolean,
    generalInfo: GeneralInfo,
    playerSpecificInfo: PlayerSpecificInfo,
    imageInfo: ImageInfo,
    linkedInfo : LinkedInfo,
    roleInfo: RoleInfo,
    combatInfo: CombatInfo,
    skillInfo: SkillInfo,
    socialInfo: SocialInfo,
    lootInfo: LootInfo,
    castingInfo: CastingInfo
}

export interface upsertParameters {
    roles: Role[],
    types: Type[],
    climates: ClimateObject,
    combatStats: CombatStat[],
    conflicts: ConflictObject,
    skills: Skill[],
    movements: Movement[],
    variants: Variant[],
    specificLoots: SpecificLoot[],
    reagents: Reagent[],
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
    encounters: Encounter,
    lairLoot: Loot,
    carriedLoot: Loot
}

export { CombatStat, ClimateObject, Role, Type, Skill, Movement, Variant, Reagent, LocationVitality, ArtistObject, Scenario, Folklore, TablesObject, LocationObject, ConflictObject }
