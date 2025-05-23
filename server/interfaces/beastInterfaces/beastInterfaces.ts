import { SpecificLoot, Loot } from "../lootInterfaces"
import { Obstacle, Challenge } from "../skillInterfaces"
import GeneralInfo, { Folklore, Scenario, TablesObject } from './infoInterfaces/generalInfoInterfaces'
import ImageInfo, { ArtistObject } from './infoInterfaces/ImageInfoInterfaces'
import LinkedInfo, { ClimateObject, LocationObject, BeastType, Variant } from './infoInterfaces/linkedInfoInterfaces'
import RoleInfo, { Role } from './infoInterfaces/roleInfoInterfaces'
import CombatInfo, { AttackInfo, DefenseInfo, LocationVitality, Movement } from './infoInterfaces/combatInfoInterfaces'
import SkillInfo, { Skill } from './infoInterfaces/skillInfoInterfaces'
import SocialInfo, { ConflictObject } from './infoInterfaces/socialInfo'
import LootInfo, { Pleroma } from './infoInterfaces/lootInfoInterfaces'
import CastingInfo, { Casting, Spell } from './infoInterfaces/castingInfo'

export type Strength = 'majSt' | 'minSt' | 'minWk' | 'majWk' | 'one' | 'noneStr' | 'noneWk' | 'none' | 'x' | null

export interface Beast {
    id: number,
    patreon: number,
    canplayerview: boolean,
    generalInfo: GeneralInfo,
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

export { ClimateObject, Role, BeastType, Skill, Movement, Variant, Pleroma, LocationVitality, ArtistObject, Scenario, Folklore, TablesObject, LocationObject, ConflictObject }
