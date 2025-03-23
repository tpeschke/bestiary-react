export interface UpdateParameters {
    roles: Role[],
    types: Type[],
    climates: ClimateEditObject
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

interface Climate {
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