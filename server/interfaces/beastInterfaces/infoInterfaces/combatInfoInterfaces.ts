import { Strength } from "../beastInterfaces"

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
export type IsSpecial = 'yes' | 'no' | 'kinda'

export interface AttackInfo {
    measure: number,
    attack: string,
    damage: string,
    damageType: DamageType,
    type: Type,
    recovery: number,
    initiative: string,
    rangeIncrement: string,
    isspecial: IsSpecial,
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

export interface RawCombatStat {
    id: number,
    beastid: number,
    roleid: string,
    piercingweapons: Strength,
    slashingweapons: Strength,
    crushingweapons: Strength,
    weaponsmallpiercing: Strength,
    weaponsmallslashing: Strength,
    weaponsmallcrushing: Strength,
    andslashing: Strength,
    andcrushing: Strength,
    flanks: Strength,
    rangeddefense: Strength,
    alldefense: Strength,
    allaround: string,
    attack: Strength,
    isspecial: IsSpecial,
    eua: boolean,
    addsizemod: boolean,
    weapon: string,
    shield: string,
    armor: string,
    weaponname: string,
    initiative: Strength,
    measure: Strength,
    recovery: Strength,
    showonlydefenses: boolean,
    weapontype: Type,
    rangedistance: Strength,
    swarmbonus: string,
    adjustment: number,
    tdr: boolean,
    info: string
}

export interface Movement {
    id: number,
    beastid: number,
    type: string,
    stroll: number | null,
    walk: number | null,
    jog: number | null,
    run: number | null,
    sprint: number | null,
    roleid: string,
    allroles: boolean,
}

export interface RawMovement {
    id: number,
    beastid: number,
    type: string,
    roleid: string,
    allroles: boolean,
    strollstrength: string,
    walkstrength: string,
    jogstrength: string,
    runstrength: string,
    sprintstrength: string,
    adjustment: number
}

export interface VitalityInfo {
    locationalVitalities: LocationVitality[],
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