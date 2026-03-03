import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import getSkullNumber from "../getSkulls";
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/skill/calculateStress";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex";
import getSkills from "@bestiary/common/utilities/scalingAndBonus/skill/getSkills";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";

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
            strength: stressThresholdStrength
        },
        skills: getSkills(skillRole, skullIndex),
        obstacles: [],
        challenges: [],
    }
}