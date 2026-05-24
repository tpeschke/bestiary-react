import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import { Obstacle, Challenge } from "../../obstacles/obstacleCatalog"
import { DiceOptions, SystemOption } from "../beast";
import { SystemInfoArray } from "./generalInfoInterfaces";

export default interface SkillInfo {
    type: SystemOption,
    skillRole: string,
    skillSecondary: string,
    skillSkulls: number,
    skullIndex: number,
    skillEpValue: number,
    skillRawEpValue: number,
    epValueIndex: number,
    stress: {
        threshold: number | string | null,
        strength: Strength,
        defenseNFleeDice: {
            defense: DiceOptions,
            flee: DiceOptions
        },
    },
    attackInfo: SystemInfoArray,
    defenseInfo: SystemInfoArray,
    skills?: SkillObject,
    obstacles: Obstacle[],
    challenges: Challenge[],
}

export interface SkillObject {
    preferred?: Skill[],
    weakness?: Skill[],
    everythingElseStrength: Strength,
    everythingElse?: number
}

export interface Skill {
    id?: number,
    roleid?: string,
    skill: string,
    rank: number
}