import { VitalityInfo, AttackInfo, DefenseInfo, Movement } from '../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces'

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

export interface LocationVitality {
    id: number,
    location: string,
    vitality: string,
    beastid: number,
    deleted: boolean,
    roleid: string,
    allroles: boolean
}