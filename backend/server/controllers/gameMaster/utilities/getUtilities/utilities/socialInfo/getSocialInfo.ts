import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getDifficultyDie } from "@bestiary/common/utilities/scalingAndBonus/confrontation/confrontationCalculator"
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
    return {
        socialRole, socialSecondary,
        socialSkulls: getSkullNumber(socialPoints),
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
            difficultyDie: getDifficultyDie(socialPoints)
        }
    }
}