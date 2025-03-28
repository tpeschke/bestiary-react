export interface upsertParameters {
    roles: Role[],
    types: Type[],
    climates: ClimateEditObject,
    combatStats: CombatStat[],
    conflicts: Conflict[],
    skills: Skill[],
    movements: Movement[],
    variants: Variant[],
    loots: Loot[],
    reagents: Reagent[],
    locationalVitalities: LocationVitality[],
    locations: Location[],
    artistInfo: ArtistEditObject,
    scenarios: Scenario[],
    folklores: Folklore[],
    casting: Casting,
    deletedSpells: number[],
    spells: Spell[],
    obstacles: Obstacle[],
    challenges: Challenge[],
    tables: TablesObject,
    encounters: Encounter
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

export interface ClimateEditObject {
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

export interface Loot {
    id: number,
    beastid: number,
    loot: string,
    price: string,
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

export interface ArtistEditObject {
    allartists: ArtistInfo[],
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

export interface Obstacle {
    id: number,
    beastid: number,
    obstacleid: number,
    notes: string
}

export interface Challenge {
    id: number,
    challengeid: number,
    beastid: number
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
    rows: Row[]
}

export interface Row {
    id: number,
    weight: number,
    value: string
}

export interface Encounter {
    temperaments: TemperamentObject,
    signs: SignObject,
    nouns: NounObject,
    verbs: VerbObject,
    groups: Group[],
    numbers: Number[]
}

export interface TemperamentObject {
    beastTemperaments: Temperament[],
    allTemperaments: Temperament[]
}

export interface Temperament {
    beastid: number,
    temperament: string,
    weight: number,
    id: number,
    tooltip: string,
    deleted: boolean
}

export interface Group {
    id: number,
    beastid: number,
    deleted: boolean,
    label: string,
    weights: GroupWeight[],
    weight: number
}

export interface GroupWeight {
    id: number,
    weight: number,
    role: number,
    deleted: boolean
}

export interface Number {
    id: number,
    beastid: number,
    deleted: boolean,
    numbers: string,
    miles: string,
    weight: number
}

export interface SignObject {
    beastSigns: Sign[],
    allSigns: Sign[]
}

export interface Sign {
    sign: string,
    weight: number,
    id: number,
    beastid: number,
    deleted: boolean
}

export interface VerbObject {
    beastVerbs: Verb[],
    allVerbs: Verb[] 
}

export interface Verb {
    verb: string, 
    id: number, 
    beastid: number, 
    deleted: boolean
}

export interface NounObject {
    beastNouns: Noun[],
    allNouns: Noun[]
}

export interface Noun {
    noun: string, 
    id: number, 
    beastid: number, 
    deleted: boolean
}