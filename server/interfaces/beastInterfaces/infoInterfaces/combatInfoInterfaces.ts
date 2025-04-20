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