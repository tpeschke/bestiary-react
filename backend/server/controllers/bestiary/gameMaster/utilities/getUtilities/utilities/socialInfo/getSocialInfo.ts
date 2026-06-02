import { NonspecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity"
import getSkullNumber from "../getSkulls"
import getSocialSkillSuites from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/utilities/getSocialSkillSuites"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect"
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex"
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue"
import { buildSystemSpecificInfo } from "../../../formatUtilities/getSystemSpecificTerminologies"

export default function formatSocialInfo(
    socialRole: string,
    socialSecondary: string,
    attackInfo_bonfire: string | null,
    attackInfo_hm: string | null,
    defenseInfo_bonfire: string | null,
    defenseInfo_hm: string | null,
    socialPoints: number,
    socialSkulls: number,
    socialEpValue: number,
    capacityStrength: Strength
): NonspecificSocialInfo {
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
        isSwarm: false,
        capacity:
        {
            threshold: getCapacity(skullIndex, socialRole, socialSecondary, capacityStrength),
            strength: capacityStrength
        },
        baseConvictionRank: 0,
        attackInfo: attackInfo_hm ? [attackInfo_bonfire ?? '', undefined, attackInfo_hm] : buildSystemSpecificInfo(attackInfo_bonfire),
        defenseInfo: defenseInfo_hm ? [defenseInfo_bonfire ?? '', undefined, defenseInfo_hm] : buildSystemSpecificInfo(defenseInfo_bonfire),
        conflicts: {
            socialSkillSuites: getSocialSkillSuites(socialRole, skullIndex),
            convictions: [],
            relationships: [],
            flaws: [],
            burdens: []
        }
    }
}