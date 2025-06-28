import { Skill } from "../../../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { calculateRankForSkill } from "../../../../../../common/utilities/scalingAndBonus/skill/skillRankCalculator"

export async function getSkills(databaseConnection: any, beastId: number, skillpoints: number): Promise<Skill[]> {
    const skills: Skill[] = await databaseConnection.beast.skill.get(beastId)

    return skills.map(skill => formatSkills(skillpoints, skill)).sort((a, b) => b.rank - a.rank)
}

export function formatSkills(mainSkillPoints: number, skillInfo: Skill): Skill {
    const { id, beastid, skill, skillroleid, allroles, strength, adjustment, skillpoints, skillrole } = skillInfo

    const skillPointsToUse = skillpoints ? skillpoints : mainSkillPoints

    return {
        id, beastid, skill, skillroleid, allroles, skillrole,
        rank: calculateRankForSkill(skillPointsToUse, strength, adjustment)
    }
}