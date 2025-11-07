import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/confrontation/getCapacity"
import getSkullNumber from "../getSkulls"
import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"

export default function formatSocialInfo(
    socialRole: string,
    socialSecondary: string,
    attackInfo: string | null,
    defenseInfo: string | null,
    socialPoints: number,
    hasArchetypes: boolean,
    hasMonsterArchetypes: boolean
): SocialInfo {
    const rankDictionary = [ -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]

    const socialSkulls = getSkullNumber(socialPoints)
    const skullIndex = getSkullIndex(socialSkulls)

    return {
        socialRole, socialSecondary,
        socialSkulls,
        skullIndex,
        capacity: getCapacity(skullIndex, socialRole, socialSecondary),
        attackInfo: attackInfo ?? '',
        defenseInfo: defenseInfo ?? '',
        conflicts: {
            descriptions: [],
            convictions: [],
            relationships: [],
            flaws: [],
            burdens: []
        },
        archetypeInfo: {
            hasArchetypes, hasMonsterArchetypes,
            baseRank: getModBySkullIndex(skullIndex, 0, rankDictionary)
        }
    }
}