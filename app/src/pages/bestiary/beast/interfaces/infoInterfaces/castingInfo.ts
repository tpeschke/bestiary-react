import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo";

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