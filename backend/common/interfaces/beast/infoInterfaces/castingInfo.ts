
export default interface CastingInfo {
    casting: Casting,
    spells: Spell[], 
}

export interface Casting {
    castingTypesArray: boolean[],
    spellnumberdie: string,
    defaulttype: number | null,
    beastid: number
}


export interface Spell {
    id: string,
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