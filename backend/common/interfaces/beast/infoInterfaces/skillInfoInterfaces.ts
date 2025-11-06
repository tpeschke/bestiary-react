import { Challenge, Obstacle } from "../../../../server/interfaces/skillInterfaces";
import { Strength } from "../../calculationInterfaces";

export default interface SkillInfo {
    stress: number | string,
    stressStrength: Strength,
    skillRole: string,
    skillSecondary: string,
    skillSkulls: number,
    skullIndex: number,
    attackInfo: string,
    defenseInfo: string,
    skills: Skill[],
    obstacles: Obstacle[],
    challenges: Challenge[],
}

export interface Skill {
    id: number,
    beastid: number,
    skill: string,
    rank: number,
    skillroleid: string,
    skillrole: string,
    allroles: boolean,
    deleted?: boolean
}