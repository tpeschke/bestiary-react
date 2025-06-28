import { Challenge, Obstacle } from "../../../../server/interfaces/skillInterfaces";
import { Strength } from "../../calculationInterfaces";


export default interface SkillInfo {
    panic: number | boolean,
    stress: number | string,
    stressStrength: Strength,
    panicStrength: Strength,
    skillrole: string,
    skillsecondary: string,
    skillpoints: number,
    atk_skill: string,
    def_skill: string,
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
    skillpoints?: number,
    allroles: boolean,
    strength?: Strength,
    adjustment?: number,
    deleted?: boolean
}