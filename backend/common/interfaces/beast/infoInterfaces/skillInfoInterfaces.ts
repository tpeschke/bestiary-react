import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import { Obstacle, Challenge } from "../../obstacles/obstacleCatalog"
import { DiceOptions } from "../beast";

export default interface SkillInfo {
    stress: {
        threshold: number | string | null,
        strength: Strength,
        defenseNFleeDice: {
            defense: DiceOptions,
            flee: DiceOptions
        },
    },
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
    id?: number,
    skill: string,
    rank: number
}