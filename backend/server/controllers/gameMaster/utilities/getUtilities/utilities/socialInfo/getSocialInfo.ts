import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/confrontation/getCapacity"
import getSkullNumber from "../getSkulls"
import getBaseSocialRank from "@bestiary/common/utilities/scalingAndBonus/confrontation/getBaseSocialRank"

export default function formatSocialInfo(
    socialRole: string,
    socialSecondary: string,
    attackInfo: string | null,
    defenseInfo: string | null,
    socialPoints: number,
    hasArchetypes: boolean,
    hasMonsterArchetypes: boolean
): SocialInfo {
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
            baseRank: getBaseSocialRank(skullIndex)
        }
    }
}