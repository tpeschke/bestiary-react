import { VitalityInfo } from '../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'

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

export interface LocationVitality {
    id: number,
    location: string,
    vitality: string,
    beastid: number,
    deleted: boolean,
    roleid: string,
    allroles: boolean
}