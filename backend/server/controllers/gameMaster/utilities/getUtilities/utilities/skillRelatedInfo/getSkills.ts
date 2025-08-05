import { Skill } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { calculateRankForSkill } from "@bestiary/common/utilities/scalingAndBonus/skill/skillRankCalculator"
import { BackendSkill } from "../../../../../../interfaces/beast/GetInterfaces"

export async function getSkills(databaseConnection: any, beastId: number, skillpoints: number): Promise<Skill[]> {
    const skills: Skill[] = await databaseConnection.beast.skill.get(beastId)

    return skills.map(skill => formatSkills(skillpoints, skill)).sort((a, b) => b.rank - a.rank)
}

export function formatSkills(mainSkillPoints: number, skillInfo: BackendSkill): Skill {
    const { id, beastid, skill, skillroleid, allroles, strength, adjustment = 0, skillpoints, skillrole } = skillInfo

    const skillPointsToUse = skillpoints ? skillpoints : mainSkillPoints

    return {
        id, beastid, skill, skillroleid, allroles, skillrole, strength, adjustment,
        rank: calculateRankForSkill(skillPointsToUse, strength, adjustment)
    }
}