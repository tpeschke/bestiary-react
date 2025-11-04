import { Challenge, Obstacle } from "../../../../server/interfaces/skillInterfaces";
import { Strength } from "../../calculationInterfaces";

export default interface SkillInfo {
    panic: number | boolean,
    stress: number | string,
    stressStrength: Strength,
    panicStrength: Strength,
    skillrole: string,
    skillsecondary: string,
    skillSkulls: number,
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
    adjustment: number,
    strength: Strength,
    skillroleid: string,
    skillrole: string,
    allroles: boolean,
    deleted?: boolean
}