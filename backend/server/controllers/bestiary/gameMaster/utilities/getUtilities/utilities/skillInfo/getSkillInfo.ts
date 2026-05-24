import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import getSkullNumber from "../getSkulls";
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee";
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue";
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex";
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect";
import { buildSystemSpecificInfo } from "../../../formatUtilities/getSystemSpecificTerminologies";

export default function formatSkillInfo(
    skillRole: string,
    skillSecondary: string,
    skillPoints: number,
    skillSkulls: number,
    skillEpValue: number,
    attackInfo: string,
    defenseInfo: string,
    stressThresholdStrength: Strength
): SkillInfo {
    skillSkulls = skillSkulls ?? getSkullNumber(skillPoints)
    const skullIndex = getSkullIndex(skillSkulls)

    const baseEpValue =  skillEpValue ?? getBaseEPValue(skillSkulls)
    const epValueIndex = getEPIndex(baseEpValue)

    return {
        type: 'Bonfire',
        skillRole, skillSecondary, skullIndex,
        skillSkulls: getSkullNumber(skillSkulls),
        skillEpValue: calculateSecondaryRoleEffect(baseEpValue, skillSecondary),
        skillRawEpValue: baseEpValue,
        epValueIndex,
        attackInfo: buildSystemSpecificInfo(attackInfo),
        defenseInfo: buildSystemSpecificInfo(defenseInfo),
        stress: {
            threshold: calculateStress(skillSecondary, skullIndex, stressThresholdStrength),
            strength: stressThresholdStrength,
            defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex),
        },
        obstacles: [],
        challenges: [],
    }
}