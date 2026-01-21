import { Obstacle, Challenge } from "../../obstacles/obstacleCatalog"

export default interface SkillInfo {
    stress: number | string,
    skillRole: string,
    skillSecondary: string,
    skillSkulls: number,
    skullIndex: number,
    attackInfo: string,
    defenseInfo: string,
    skills: SkillObject,
    obstacles: Obstacle[],
    challenges: Challenge[],
}

export interface SkillObject {
    preferred?: Skill[],
    weakness?: Skill[],
    everythingElse?: number
}

export interface Skill {
    skill: string,
    rank: number
}