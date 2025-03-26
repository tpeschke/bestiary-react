export interface UpdateParameters {
    roles: Role[],
    types: Type[],
    climates: ClimateEditObject,
    combatStats: CombatStat[],
    conflicts: Conflict[],
    skills: Skill[],
    movements: Movement[],
    variants: Variant[],
    loots: Loot[]
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