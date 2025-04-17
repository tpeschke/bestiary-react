import SkillInfo from "../../../../../../interfaces/infoInterfaces.ts/skillInfoInterfaces"

import RoleTitle from "../../../roleTitle/RoleTitle"
import Body from "../../../../../../components/UI/body/Body"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"

interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillrole, skillpoints, skills, atk_skill, def_skill } = skillInfo
    
    return (
        <>
            <RoleTitle title="Skills" points={skillpoints} role={skillrole} />
            <Body>
                {skills ?
                    <SkillsDisplay skills={skills} />
                    : <></>}
            </Body>
            <SpecialInfo section="Skill" type="Attack" info={atk_skill} />
            <SpecialInfo section="Skill" type="Defense" info={def_skill} />
        </>
    )
}