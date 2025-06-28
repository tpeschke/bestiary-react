import { Strength } from "../../../common/interfaces/calculationInterfaces";

export interface BackendSkill {
    id: number,
    beastid: number,
    skill: string,
    rank: number,
    skillroleid: string,
    skillrole: string,
    skillpoints?: number,
    allroles: boolean,
    strength: Strength | null,
    adjustment?: number,
    deleted?: boolean
}