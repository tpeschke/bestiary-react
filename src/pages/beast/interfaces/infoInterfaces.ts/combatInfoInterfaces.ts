export default interface CombatInfo {
    sp_atk: string,
    sp_def: string,
    tactics: string,
    combatpoints: number,
    combatrole: string,
    combatsecondary: string,
    vitalityInfo: VitalityInfo
    combatStats: CombatStat[],
    movements: Movement[],
}

export interface CombatStat {
    id: number,
    beastid: number,
    roleid: string,
    info: string,
    name: string,
    attackInfo?: AttackInfo,
    defenseInfo: DefenseInfo,
    equipmentInfo: EquipmentInfo
    swarmbonus: string,
}

export interface EquipmentInfo {
    weapon: string,
    shield: string,
    armor: string,
}

export type DamageType = 'P' | 'C' | 'S'
export type Type = 'm' | 'r'

export interface AttackInfo {
    measure: number,
    attack: string,
    damage: string,
    damageType: DamageType,
    type: Type,
    recovery: number,
    initiative: string,
    rangeIncrement: string,
    isspecial: string,
}

export interface DefenseInfo {
    defense: string,
    flanks: number,
    parry: string,
    cover: string,
    parryDR: string,
    dr: string,
    eua: boolean,
    tdr: boolean
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
    deleted: boolean
}

export interface VitalityInfo {
    locationalVitalities?: LocationVitality[],
    fatigue: string | number | boolean,
    notrauma: boolean,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    vitality: string | number,
    trauma: number | boolean
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