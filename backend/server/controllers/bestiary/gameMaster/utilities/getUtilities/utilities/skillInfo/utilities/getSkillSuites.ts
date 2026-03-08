import { SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import query from "../../../../../../../../db/database";
import getSkills from "@bestiary/common/utilities/scalingAndBonus/skill/getSkills";
import getSkillRank from "@bestiary/common/utilities/scalingAndBonus/skill/getSkillRank";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";

const getPreferredSuitesWithRole = `select * from bbSkillSuites
where key = 'preferred' and beastID = $1 and roleID = $2
order by index`

const getPreferredSuitesWithoutRole = `select * from bbSkillSuites
where key = 'preferred' and beastID = $1 and roleID is null
order by index`

const getWeaknessSuitesWithRole = `select * from bbSkillSuites
where key = 'weakness' and beastID = $1 and roleID = $2
order by index`

const getWeaknessSuitesWithoutRole = `select * from bbSkillSuites
where key = 'weakness' and beastID = $1 and roleID is null
order by index`

export default async function getGenericSkillSuites(beastID: number, roleID: string | null, role: string, skullIndex: number, everythingElseStrength: Strength): Promise<SkillObject> {
    const [preferred, weakness] = await Promise.all([
        roleID ? query(getPreferredSuitesWithRole, [beastID, roleID]) : query(getPreferredSuitesWithoutRole, beastID),
        roleID ? query(getWeaknessSuitesWithRole, [beastID, roleID]) : query(getWeaknessSuitesWithoutRole, beastID),
    ])

    if (preferred.length > 0 || weakness.length > 0) {
        const everythingElse = getSkillRank(skullIndex)

        return {
            preferred,
            weakness,
            everythingElse,
            everythingElseStrength
        }
    }

    return getSkills(role, skullIndex, everythingElseStrength)
}