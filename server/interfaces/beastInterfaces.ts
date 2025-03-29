import { Encounter } from "./encounterInterfaces"
import { SpecificLoot, Loot } from "./lootInterfaces"
import { Obstacle, Challenge } from "./skillInterfaces"

// NOTE TO SELF: AFTER REFACTORING THE GET, I NEED TO REFACTOR THIS AND THEN REFACTOR GET AND UPSERT
//      Added comments for where the natural break up of things are
//      Should also do the same for Role
export interface Beast {
    id: number,
    patreon: number,
    canplayerview: boolean,
// General Info
    name: string,
    plural: string,
    intro: string,
    habitat: string,
    ecology: string,
    scenarios: Scenario[],
    folklores: Folklore[],
    encounters: Encounter,
    senses: string,
    diet: string,
    meta: string,
    size: string,
    rarity: number,
    tables: TablesObject,
// Player Specific Info
    favorite: boolean,
    notes: string,
// Image Info
    thumbnail: string,
    imagesource: number,
    artistInfo: ArtistObject,
// Linked Info
    variants: Variant[],
    locations: LocationObject,
    types: Type[],
    climates: ClimateObject,
// Role Info
    rolenameorder: number,
    roles: Role[],
    defaultrole: string,
// Combat Info
    sp_atk: string,
    sp_def: string,
    tactics: string,
    caution: number, // remove
    combatpoints: number,
    role: string,
    secondaryrole: string,
    combatStats: CombatStat[],
    movements: Movement[],
    // Vitality Info (sub folder)
    locationalVitalities: LocationVitality[],
    fatigue: string,
    fatiguestrength: string,
    notrauma: boolean,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    vitality: string,
// Skill Info
    panic: number,
    panicstrength: number,
    stress: number,
    skillrole: string,
    skillsecondary: string,
    skillpoints: number,
    atk_skill: string,
    def_skill: string,
    skills: Skill[],
    obstacles: Obstacle[],
    challenges: Challenge[],
// Confrontation Info
    traitlimit: number,
    devotionlimit: number,
    flawlimit: number,
    passionlimit: number,
    socialrole: string,
    socialsecondary: string,
    socialpoints: number,
    descriptionshare: number,
    convictionshare: number,
    devotionshare: number,
    atk_conf: string,
    def_conf: string,
    conflicts: ConflictObject,
    // Archetypes
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    archetype: ArchetypeInfo | string[] | null,
// Loot Info
    lootnotes: string,
    specificLoots: SpecificLoot[],
    reagents: Reagent[],
    lairLoot: Loot,
    carriedLoot: Loot
// Spellcasting Info
    casting: Casting,
    deletedSpells: number[],
    spells: Spell[], 
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

export interface ArchetypeInfo {
    archetype: string,
    deviation: boolean,
    reverse: boolean
}

export interface Role {
    id: string,
    vitality: string,
    hash: string,
    name: string,
    role: string,
    attack: string,
    defense: string,
    secondaryrole: string,
    combatpoints: number,
    panic: number,
    stress: number,
    socialrole: number,
    socialpoints,
    skillrole: number,
    skillpoints,
    socialsecondary: number,
    size: number,
    fatigue: number,
    largeweapons: number,
    mental: number,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    attack_skill: string,
    defense_skill: string,
    attack_conf: string,
    defense_conf: string,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    skillsecondary: string
}

export interface Type {
    id: number,
    beastid: number,
    typeid: number,
    deleted: boolean
}

export interface LocationObject {
    alllocations: Location[],
    beast: Location[]
}

export interface ClimateObject {
    allclimates: Climate[],
    beast: Climate[]
}

export interface Climate {
    beastid: number,
    climate: string,
    code: string,
    examples: string,
    uniqueid: number,
    climateid?: number,
    id?: number,
    priority?: number,
    deleted?: boolean
}

export interface CombatStat {
    id: number,
    beastid: number,
    roleid: string,
    piercingweapons: string,
    slashingweapons: string,
    crushingweapons: string,
    weaponsmallslashing: string,
    weaponsmallcrushing: string,
    weaponsmallpiercing: string,
    andslashing: string,
    andcrushing: string,
    flanks: string,
    rangeddefence: string,
    alldefense: string,
    allaround: string,
    armorandshields: string,
    unarmored: string,
    attack: string,
    isspecial: string,
    eua: boolean,
    addsizemod: boolean,
    weapon: string,
    shield: string,
    armor: string,
    weaponname: string,
    rangeddefense: string,
    initiative: string,
    measure: string,
    recovery: string,
    showonlydefenses: boolean,
    weapontype: string,
    rangedistance: string,
    swarmbonus: string,
    adjustment: number,
    tdr: boolean,
    info: string
}

export interface ConflictObject {
    descriptions: Conflict[],
    convictions: Conflict[],
    devotions: Conflict[],
    flaws: Conflict[],
    burdens: Conflict[]
}

export interface Conflict {
    id: number,
    beastid: number,
    trait: string,
    value: string,
    type: string,
    socialroleid: string,
    allroles: boolean,
    severity: number,
    strength: string,
    adjustment: number,
    deleted: boolean
}

export interface Skill {
    id: number,
    beastid: number,
    skill: string,
    rank: string,
    skillroleid: string,
    allroles: boolean,
    strength: string,
    adjustment: number,
    deleted: boolean
}

export interface Movement {
    id: number,
    beastid: number,
    stroll: string,
    walk: string,
    jog: string,
    run: string,
    sprint: string,
    type: string,
    roleid: string,
    allroles: boolean,
    strollstrength: string,
    walkstrength: string,
    jogstrength: string,
    runstrength: string,
    sprintstrength: string,
    adjustment: number,
    deleted: boolean
}

export interface Variant {
    id: number,
    beastid: number,
    variantid: number,
    deleted: boolean
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

export interface LocationVitality {
    id: number,
    location: string,
    vitality: string,
    beastid: number,
    deleted: boolean,
    roleid: string,
    allroles: boolean
}

export interface Location {
    id: number,
    beastid: number,
    locationid: number,
    location: string,
    link: string,
    deleted: boolean
}

export interface ArtistInfo {
    id: number,
    artistid: number,
    artist: string,
    tooltip: string,
    link: string,
    roleid: string
}

export interface ArtistObject {
    genericArtistInfo: ArtistInfo,
    allartists?: ArtistInfo[],
    roleartists: ArtistInfo[]
}

export interface ArtistInfo {
    id: number,
    artistid: number,
    artist: string,
    tooltip: string,
    link: string,
    roleid: string
}

export interface Scenario {
    id: number,
    beastid: number,
    scenario: string
}

export interface Folklore {
    id: number,
    beastid: number,
    belief: string,
    truth: string
}

export interface Casting {
    augur: string,
    wild: string,
    vancian: string,
    spellnumberdie: string,
    manifesting: string,
    commanding: string,
    bloodpact: string,
    defaulttype: string,
    beastid: number
}

export interface Spell {
    id: number,
    name: string,
    origin: string,
    shape: string,
    range: string,
    interval: string,
    effect: string,
    beastid: number,
    allroles: boolean,
    roleid: string,
    resist: string
}

export interface TablesObject {
    appearance: Table[],
    habitat: Table[],
    attack: Table[],
    defense: Table[]
}

export interface Table {
    id: number,
    beastid: number,
    label: string,
    rows: Row[],
    section: string
}

export interface Row {
    id: number,
    weight: number,
    value: string
}