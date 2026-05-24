import SocialInfo from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity"
import getSkullNumber from "../getSkulls"
import getBaseSocialRank from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getBaseSocialRank"
import getSocialSkillSuites from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/utilities/getSocialSkillSuites"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect"
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex"
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue"
import { buildSystemSpecificInfo } from "../../../formatUtilities/getSystemSpecificTerminologies"

export default function formatSocialInfo(
    socialRole: string,
    socialSecondary: string,
    attackInfo: string | null,
    defenseInfo: string | null,
    socialPoints: number,
    socialSkulls: number,
    socialEpValue: number,
    hasArchetypes: boolean,
    hasMonsterArchetypes: boolean,
    capacityStrength: Strength
): SocialInfo {
    socialSkulls = socialSkulls ?? getSkullNumber(socialPoints)
    const skullIndex = getSkullIndex(socialSkulls)

    const baseSocialEpValue = socialEpValue ?? getBaseEPValue(socialSkulls)
    const epValueIndex = getEPIndex(baseSocialEpValue)

    return {
        type: 'Bonfire',
        socialRole, socialSecondary,
        socialSkulls,
        skullIndex,
        socialEpValue: calculateSecondaryRoleEffect(baseSocialEpValue, socialSecondary),
        socialRawEpValue: baseSocialEpValue,
        epValueIndex,
        capacity:
        {
            threshold: getCapacity(skullIndex, socialRole, socialSecondary, capacityStrength),
            strength: capacityStrength
        },
        baseConvictionRank: 0,
        attackInfo: buildSystemSpecificInfo(attackInfo),
        defenseInfo: buildSystemSpecificInfo(defenseInfo),
        conflicts: {
            socialSkillSuites: getSocialSkillSuites(socialRole, skullIndex),
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