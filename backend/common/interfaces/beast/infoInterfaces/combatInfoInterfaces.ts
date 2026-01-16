import { ProcessedWeapon } from "../../../../server/controllers/gear/interfaces/weaponInterfaces"
import { Strength } from "../../calculationInterfaces"

export default interface CombatInfo {
    attackInfo: string,
    defenseInfo: string,
    combatSkulls: number,
    skullIndex: number,
    combatRole: string,
    combatSecondary: string,
    vitalityInfo: VitalityInfo,
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[],
    movements: Movement[],
    strategiesNLimits?: StrategyNLimits[]
}

export type DamageType = 'P' | 'C' | 'S' | 'Ps' | 'Pg' | 'Pp'
export type IsSpecial = 'yes' | 'no' | 'kinda'

export type AttackInfo = AttackReference | WeaponInfo

export interface AttackReference {
    infoType: 'reference'
    id?: number,
    reference: string,
    situation?: string,
    tactic?: string,
    overAllIndex: number,
    roleid?: string
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

export interface DefenseInfo {
    id?: number,
    oldID: number,
    beastid: number,
    roleid: string,
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
    weaponBreakageVitality: boolean,
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