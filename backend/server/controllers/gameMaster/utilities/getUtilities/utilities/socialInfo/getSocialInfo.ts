import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import getBaseSocialRank from "@bestiary/common/utilities/scalingAndBonus/confrontation/getBaseSocialRank"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/confrontation/getCapacity"
import getSkullNumber from "../getSkulls"

export default function formatSocialInfo(
    socialRole: string,
    socialSecondary: string,
    atk_conf: string | null,
    def_conf: string | null,
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
        attackInfo: atk_conf ?? '',
        defenseInfo: def_conf ?? '',
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