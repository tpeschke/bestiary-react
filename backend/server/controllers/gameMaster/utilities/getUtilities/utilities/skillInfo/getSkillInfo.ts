import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import getSkullNumber from "../getSkulls";
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/skill/calculateStress";
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex";

export default function formatSkillInfo(
    skillRole: string, 
    skillSecondary: string,
    skillPoints: number,
    skillSkulls: number,
    attackInfo: string,
    defenseInfo: string,
): SkillInfo {
    skillSkulls = skillSkulls ?? getSkullNumber(skillPoints)
    const skullIndex = getSkullIndex(skillSkulls)

    return {
        skillRole, skillSecondary, skullIndex,
        skillSkulls: getSkullNumber(skillSkulls),
        attackInfo: attackInfo ?? '',
        defenseInfo: defenseInfo ?? '',
        stress: calculateStress(skillRole, skillSecondary, skullIndex),
        skills: [],
        obstacles: [],
        challenges: [],
    }
}