import { Skill } from "../../../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { formatSkills } from "../../../../../../common/utilities/scalingAndBonus/skill/skillCalculator"

export async function getSkills(databaseConnection: any, beastId: number, skillpoints: number): Promise<Skill[]> {
    const skills: Skill[] = await databaseConnection.beast.skill.get(beastId)

    return skills.map(skill => formatSkills(skillpoints, skill)).sort((a, b) => b.rank - a.rank)
}