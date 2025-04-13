import { Obstacle, Challenge } from "../skillInterfaces";

export default interface SkillInfo {
    panic: number,
    stress: number,
    skillrole: string,
    skillsecondary: string,
    skillpoints: number,
    atk_skill: string,
    def_skill: string,
    skills?: Skill[],
    obstacles?: Obstacle[],
    challenges?: Challenge[],
}

export interface Skill {
    id: number,
    beastid: number,
    skill: string,
    rank: string,
    skillroleid: string,
    allroles: boolean,
    strength: string,
    adjustment: number,
    deleted: boolean
}