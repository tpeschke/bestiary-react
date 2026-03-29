import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import getSkullNumber from "../getSkulls";
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee";
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue";
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex";
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect";

export default function formatSkillInfo(
    skillRole: string,
    skillSecondary: string,
    skillPoints: number,
    skillSkulls: number,
    attackInfo: string,
    defenseInfo: string,
    stressThresholdStrength: Strength
): SkillInfo {
    skillSkulls = skillSkulls ?? getSkullNumber(skillPoints)
    const skullIndex = getSkullIndex(skillSkulls)

    const baseEpValue = getBaseEPValue(skillSkulls)
    const epValueIndex = getEPIndex(baseEpValue)

    return {
        type: 'Bonfire',
        skillRole, skillSecondary, skullIndex,
        skillSkulls: getSkullNumber(skillSkulls),
        epValue: calculateSecondaryRoleEffect(baseEpValue, skillSecondary),
        epValueIndex,
        attackInfo: attackInfo ?? '',
        defenseInfo: defenseInfo ?? '',
        stress: {
            threshold: calculateStress(skillSecondary, skullIndex, stressThresholdStrength),
            strength: stressThresholdStrength,
            defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex),
        },
        obstacles: [],
        challenges: [],
    }
}