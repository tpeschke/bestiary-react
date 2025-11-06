import { Skill } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { calculateRankForSkill } from "@bestiary/common/utilities/scalingAndBonus/skill/skillRankCalculator"
import { getMonsterSkills } from "../../../../../../../db/beast/skill"
import query from "../../../../../../../db/database"
import { BackendSkill } from "../../../../../../../interfaces/beast/GetInterfaces"
import getSkullNumber from "../../getSkulls"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"

export async function getSkills(beastId: number, skullIndex: number): Promise<Skill[]> {
    const skills: BackendSkill[] = await query(getMonsterSkills, beastId)

    return skills.map(skill => formatSkills(skullIndex, skill)).sort((a, b) => b.rank - a.rank)
}

export function formatSkills(mainSkullIndex: number, skillInfo: BackendSkill): Skill {
    const { id, beastid, skill, skillroleid, allroles, skillpoints = null, skillrole } = skillInfo

    const skillIndexToUse = getSkullIndexToUse(mainSkullIndex, skillpoints)

    return {
        id, beastid, skill, skillroleid, allroles, skillrole,
        rank: calculateRankForSkill(skillIndexToUse)
    }
}

function getSkullIndexToUse(mainSkullIndex: number, skillSkullPoints: number | null): number {
    if (!skillSkullPoints) { return mainSkullIndex }

    return getSkullIndex(getSkullNumber(skillSkullPoints))
}