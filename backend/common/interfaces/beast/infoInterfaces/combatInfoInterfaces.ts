import { Strength } from "../../calculationInterfaces"
import { DiceOptions, SystemOption } from "../beast"
import { Spell } from "./castingInfo"
import { SystemInfoValue } from "./generalInfoInterfaces"

export interface BasicCombatInfo {
    type: SystemOption,
    combatRole: string,
    combatSecondary: string,
    combatSkulls: number,
    skullIndex: number,
    combatEpValue: number,
    combatRawEpValue: number,
    epValueIndex: number,
}

export interface NonspecificCombatInfo extends BasicCombatInfo {
    attackInfo: SystemInfoValue,
    roleAttackInfo?: SystemInfoValue,
    defenseInfo: SystemInfoValue,
    roleDefenseInfo?: SystemInfoValue,
    limitNotes: string,
    initiative: string,
    attacks: AttackStats[],
    defenses: DefenseInfo[],
    movements: Movement[],
    vitalityInfo: BonfireVitalityInfo,
    strategiesNLimits?: StrategyNLimits[],
    options: StrategicOptions
}

export interface SpecificCombatInfo extends BasicCombatInfo {
    attackInfo: string,
    defenseInfo: string,
    attacks: AttackStats[],
    defenses: HackMasterDefenseInfo[] | BonfireDefenseInfo[],
    limitNotes: string,
    strategiesNLimits?: StrategyNLimits[],
    options: StrategicOptions
}

export interface HackMasterCombatInfo extends SpecificCombatInfo {
    type: 'HackMaster',
    vitalityInfo: HackMasterVitalityInfo,
    initiative: string,
    defenses: HackMasterDefenseInfo[],
    movements: Movement[],
    limitNotes: string,
    strategiesNLimits?: StrategyNLimits[],
    options: StrategicOptions
}

export interface BonfireCombatInfo extends SpecificCombatInfo {
    type: 'Bonfire',
    vitalityInfo: BonfireVitalityInfo,
    initiative: string,
    defenses: BonfireDefenseInfo[],
    movements: Movement[],
}

export interface ProcessedWeapon {
    name: string,
    type: DamageType,
    damage: DamageInfo,
    size: SizeCategories,
    recovery: number,
    parry: number,
    measure: number,
    bonus: string,
    range?: string
}

export interface DamageInfo {
    dice: string[],
    string: string,
}

export type SizeCategories = 'S' | 'M' | 'L'

export type DamageType = 'P' | 'C' | 'S' | 'Ps' | 'Pg' | 'Pp' | 'Swarm'
export type IsSpecial = 'yes' | 'no' | 'kinda'

export type AttackStats = AttackReference | SwarmReference | AllSpecificWeaponInfo | SpellReference

export interface AttackReference {
    system: SystemOption,
    infoType: 'reference'
    id?: number,
    reference: string,
    situation?: string,
    tactic?: string,
    overAllIndex: number,
    roleid?: string
}

export interface SpellReference {
    infoType: 'spell',
    id?: number,
    spellid?: string,
    situation?: string,
    overAllIndex: number,
    roleid?: string,
    spellInfo?: Spell
}

export interface SwarmReference {
    system: SystemOption,
    infoType: 'swarm',
    id?: number,
    oldID: number,
    beastId: number,
    roleid?: string,
    name: string,
    swarmbonus: boolean,
    damage: string,
    overAllIndex: number,
}

export type AllSpecificWeaponInfo = BonfireWeaponInfo | HackMasterWeaponInfo

export interface BasicWeaponInfo {
    id?: number,
    oldID: number,
    situation: string | undefined,
    tactic: string | undefined,
    beastId: number,
    name: string,
    chosenName: string,
    swarmbonus: boolean,
    measure: number,
    attack: string,
    damage: string,
    system: SystemOption,
    infoType: 'weapon',
    roleid?: string,
    weapon: string,
    weaponName: string,
    damageType: DamageType,
    recovery: number,
    rangeIncrement: string,
    isSpecial: IsSpecial,
    overAllIndex: number,
    weaponInfo: ProcessedWeapon,
    info: SystemInfoValue,
    scalingInfo: {
        swarmbonus: boolean,
        name: string,
        weapon: string,
        damageType: DamageType,
        weaponType: Type,
        addsizemod: boolean,
    }
}

export interface BonfireWeaponInfo extends BasicWeaponInfo {
    system: 'Bonfire',
}

export interface HackMasterWeaponInfo extends BasicWeaponInfo {
    system: 'HackMaster',
    shieldDamage: string
}

export type DefenseInfo = BonfireDefenseInfo | HackMasterDefenseInfo

export interface BonfireDefenseInfo {
    id?: number,
    oldID?: number,
    beastid: number,
    roleid: string | null,
    system: 'Bonfire',
    info: SystemInfoValue,
    name: string,
    chosenName: string,
    defensename?: string,
    swarmbonus: boolean,
    defense: number,
    flanks: number,
    parry: number,
    cover: number,
    parryDR: string,
    dr: string,
    eua: boolean,
    tdr: boolean,
    shield: string,
    armor: string,
    overAllIndex: number,
    scalingInfo: {
        name: string | undefined,
        swarmbonus: boolean,
        addsizemod: boolean
        eua: boolean,
        tdr: boolean,
        shield: string,
        armor: string,
        drAdjust: number
    }
}

export interface HackMasterDefenseInfo {
    id?: number,
    oldID?: number,
    beastid: number,
    roleid: string | null,
    system: 'HackMaster',
    info: SystemInfoValue,
    name: string,
    chosenName: string,
    defensename?: string,
    defense: number,
    dr: string,
    parryDR: string | undefined,
    shieldCover?: string | undefined,
    eua: boolean,
    tdr: boolean,
    shield: string,
    armor: string,
    overAllIndex: number,
    scalingInfo: {
        name: string | undefined,
        eua: boolean,
        shield: string,
        armor: string,
        addsizemod: boolean,
        drAdjust: number
    }
}

export type Type = 'm' | 'r'

export interface RawCombatStat {
    id: number,
    oldid: number,
    attackid?: number,
    defenseid?: number,
    reference?: string,
    defensename: string | undefined,
    attackrole: string | null,
    situation: string | undefined,
    tactic: string | undefined,
    beastid: number,
    roleid: string,
    combatpoints: number,
    role: string,
    piercingweapons: Strength,
    slashingweapons: Strength,
    crushingweapons: Strength,
    damagetype: DamageType,
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
    swarmbonus: boolean,
    adjustment: number,
    tdr: boolean,
    info: string | null,
    info_hm: string | null,
    attackinfo: string | null,
    attackinfo_hm: string | null,
    spellid: string,
    dradjust: number
}

export interface Movement {
    id: number,
    beastId: number,
    type: string,
    stroll: number | null,
    walk: number | null,
    jog: number | null,
    run: number | null,
    sprint: number | null,
    roleId: string,
    role: string,
    allRoles: boolean,
}

export interface RawMovement {
    id: number,
    beastid: number,
    type: string,
    role: string,
    combatpoints: number,
    roleid: string,
    allroles: boolean,
    strollstrength: Strength,
    walkstrength: Strength,
    jogstrength: Strength,
    runstrength: Strength,
    sprintstrength: Strength
    adjustment: number
}

export interface VitalityInfo {
    locationalVitalities: LocationVitality[],
    vitality: string | number,
    hasNoVitality: boolean,
    trauma: number | boolean
    noTrauma: boolean,
    knockback: number,
    singleDieVitality: boolean,
    noKnockback: boolean,
    rollUnderTrauma: number,
    isIncorporeal: boolean,
    weaponBreakageVitality: boolean,
    isSwarm: boolean
}

export interface BonfireVitalityInfo extends VitalityInfo {
    defenseNFleeDice: {
        defense: DiceOptions,
        flee: DiceOptions
    }
}

export interface HackMasterVitalityInfo extends VitalityInfo {
    defenseNFleeDice: {
        defense: number | null,
        flee: number | null
    }
}

export interface LocationVitality {
    id: number,
    location: string,
    vitality: string | number,
    beastid: number,
    deleted: boolean,
    roleid: string,
    allroles: boolean
}

export interface StrategyNLimits {
    id: number,
    beastID: number,
    groupID: number,
    group: string,
    chaos: number | null,
    chaosNote: boolean,
    diminish: number,
    strategies: string | null,
    strategiesNote: boolean,
    baselineStrategies: string | null
    treasure: string | null,
    notes: string
}

export interface StrategicOptions {
    obstacles: StrategicObstacles[],
    customs: Custom[],
    other: OtherStrategicOption[]
}

export interface StrategicObstacles {
    id: number,
    obstacleid: number,
    label: string | null,
    obstaclename: string
}

export interface Custom {
    id: number,
    label: string,
    attack: string,
    defense: string,
}

export interface OtherStrategicOption {
    id: number,
    label: string,
    tooltip: string | null
}