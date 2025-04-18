import { Obstacle, Challenge } from "../../skillInterfaces";
import { Strength } from "../beastInterfaces";

export default interface SkillInfo {
    panic: number | boolean,
    stress: number | string,
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
    allroles: boolean,
    strength?: Strength,
    adjustment?: number,
    deleted?: boolean
}