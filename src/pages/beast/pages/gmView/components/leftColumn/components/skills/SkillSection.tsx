import SkillInfo from "../../../../../../interfaces/infoInterfaces.ts/skillInfoInterfaces"

import RoleTitle from "../../../roleTitle/RoleTitle"
import Body from "../../../../../../components/UI/body/Body"
import SkillsDisplay from "./components/SkillsDisplay"

interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillrole, skillpoints, skills } = skillInfo
    return (
        <>
            <RoleTitle title="Skills" points={skillpoints} role={skillrole} />
            <Body>
                {skills ?
                    <SkillsDisplay skills={skills} />
                    : <></>}
            </Body>
        </>
    )
}