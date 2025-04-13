
export default interface CastingInfo {
    casting?: Casting,
    deletedSpells?: number[],
    spells?: Spell[], 
}

export interface Casting {
    augur: string,
    wild: string,
    vancian: string,
    spellnumberdie: string,
    manifesting: string,
    commanding: string,
    bloodpact: string,
    defaulttype: string,
    beastid: number
}

export interface Spell {
    id: number,
    name: string,
    origin: string,
    shape: string,
    range: string,
    interval: string,
    effect: string,
    beastid: number,
    allroles: boolean,
    roleid: string,
    resist: string
}