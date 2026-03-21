import { Strength } from "../../calculationInterfaces"
import { DiceOptions, SystemOption } from "../beast"
import { Spell } from "./castingInfo"

export interface BasicCombatInfo {
    combatRole: string,
    combatSecondary: string,
    combatSkulls: number,
    skullIndex: number,
    epValue: number,
    epValueIndex: number,

    attackInfo: string,
    defenseInfo: string,
}

type CombatInfo = {
    type: SystemOption,
} & (HackMasterCombatInfo | BonfireCombatInfo)

export default CombatInfo

export interface HackMasterCombatInfo extends BasicCombatInfo {
    type: 'HackMaster',
    vitalityInfo: HackMasterVitalityInfo,
    initiative: string,
    attacks: AttackInfo[],
    defenses: HackMasterDefenseInfo[],
    movements: Movement[],
    limitNotes: string,
    strategiesNLimits?: StrategyNLimits[],
    options: StrategicOptions
}

export interface BonfireCombatInfo extends BasicCombatInfo {
    type: 'Bonfire',
    vitalityInfo: BonfireVitalityInfo,
    initiative: string,
    attacks: AttackInfo[],
    defenses: BonfireDefenseInfo[],
    movements: Movement[],
    limitNotes: string,
    strategiesNLimits?: StrategyNLimits[],
    options: StrategicOptions
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

export type DamageType = 'P' | 'C' | 'S' | 'Ps' | 'Pg' | 'Pp'
export type IsSpecial = 'yes' | 'no' | 'kinda'

export type AttackInfo = AttackReference | WeaponInfo | SpellReference

export interface AttackReference {
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

export interface WeaponInfo {
    infoType: 'weapon',
    id?: number,
    oldID: number,
    situation: string | undefined,
    tactic: string | undefined,
    beastId: number,
    roleid?: string,
    info: string,
    name: string,
    chosenName: string,
    weapon: string,
    weaponName: string,
    swarmbonus: boolean,
    measure: number,
    attack: string,
    damage: string,
    damageType: DamageType,
    recovery: number,
    rangeIncrement: string,
    isSpecial: IsSpecial,
    overAllIndex: number,
    weaponInfo: ProcessedWeapon,
    scalingInfo: {
        swarmbonus: boolean,
        name: string,
        weapon: string,
        weapontype: DamageType,
        addsizemod: boolean
    }
}

export type DefenseInfo = BonfireDefenseInfo | HackMasterDefenseInfo

export interface BonfireDefenseInfo {
    id?: number,
    oldID: number,
    beastid: number,
    roleid: string,
    system: SystemOption,
    info: string,
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
        eua: boolean,
        tdr: boolean,
        shield: string,
        armor: string,
        addsizemod: boolean
    }
}

export interface HackMasterDefenseInfo {
    beastid: number,
    roleid: string,
    system: SystemOption,
    info: string,
    name: string,
    chosenName: string,
    defensename?: string,
    defense: string,
    dr: string,
    cover: number,
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
        addsizemod: boolean
    }
}

export type Type = 'm' | 'r'

export interface RawCombatStat {
    id: number,
    oldID: number,
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
    damagetype: string,
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
    info: string,
    spellid?: number
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
    trauma: number | boolean
    noTrauma: boolean,
    knockback: number,
    singleDieVitality: boolean,
    noKnockback: boolean,
    rollUnderTrauma: number,
    isIncorporeal: boolean,
    weaponBreakageVitality: boolean
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