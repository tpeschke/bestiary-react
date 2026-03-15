import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import getSkullNumber from "../getSkulls";
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee";

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

    return {
        skillRole, skillSecondary, skullIndex,
        skillSkulls: getSkullNumber(skillSkulls),
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