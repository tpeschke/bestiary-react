import { SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import query from "../../../../../../../../db/database";
import getSkills from "@bestiary/common/utilities/scalingAndBonus/skill/getSkills";
import getSkillRank from "@bestiary/common/utilities/scalingAndBonus/skill/getSkillRank";

const getPreferredSuites = `select * from bbSkillSuites
where key = 'preferred' and beastID = $1 and roleID = $2
order by index`

const getWeaknessSuites = `select * from bbSkillSuites
where key = 'weakness' and beastID = $1 and roleID = $2
order by index`

export default async function getGenericSkillSuites(beastID: number, roleID: string | null, role: string, skullIndex: number): Promise<SkillObject> {
    const [preferred, weakness] = await Promise.all([
        query(getPreferredSuites, [beastID, roleID]),
        query(getWeaknessSuites, [beastID, roleID]),
    ])

    const everythingElse = getSkillRank(skullIndex)

    if (preferred.length > 0 && weakness.length > 0) {
        return {
            preferred,
            weakness,
            everythingElse
        }
    }

    return getSkills(role, skullIndex)
}