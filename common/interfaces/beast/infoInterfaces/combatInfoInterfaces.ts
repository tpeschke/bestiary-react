import { Strength } from "../../calculationInterfaces"

export default interface CombatInfo {
    sp_atk: string,
    sp_def: string,
    tactics: string,
    combatpoints: number,
    combatrole: string,
    combatsecondary: string,
    vitalityInfo: VitalityInfo,
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[],
    movements: Movement[],
}

export type DamageType = 'P' | 'C' | 'S'
export type IsSpecial = 'yes' | 'no' | 'kinda'

export interface AttackInfo {
    id: number,
    beastid: number,
    roleid: string,
    info: string,
    name: string,
    weapon: string,
    swarmbonus: string,
    measure: number,
    attack: string,
    damage: string,
    type: DamageType,
    recovery: number,
    rangeIncrement: string,
    isspecial: IsSpecial,
}

export interface DefenseInfo {
    id: number,
    beastid: number,
    roleid: string,
    name: string,
    swarmbonus: string,
    defense: string,
    flanks: number,
    parry: string,
    cover: string,
    parryDR: string,
    dr: string,
    eua: boolean,
    tdr: boolean,
    shield: string,
    armor: string,
}

export type Type = 'm' | 'r'

export interface RawCombatStat {
    id: number,
    beastid: number,
    roleid: string,
    combatpoints: number,
    role: string,
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
    info: string,
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
    role: string,
    combatpoints: number,
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
    vitality: string | number,
    trauma: number | boolean
    fatigue: string | number | boolean,
    vitalityStrength: Strength,
    fatigueStrength: Strength,
    notrauma: boolean,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
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