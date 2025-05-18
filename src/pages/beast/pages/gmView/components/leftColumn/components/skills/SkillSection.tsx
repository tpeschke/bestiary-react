import SkillInfo from "../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"

import RoleTitle from "../../../roleTitle/RoleTitle"
import Body from "../../../../../../components/UI/body/Body"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import Pair from "../../../../../../components/UI/pair/Pair"

interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillrole, skillpoints, skills, atk_skill, def_skill, skillsecondary, panic, stress } = skillInfo

    let stressString = `${stress}`
    if (panic) { stressString = `(${panic}) ` + stressString }

    return (
        <>
            <RoleTitle title="Skills" points={skillpoints} role={skillrole} secondaryRole={skillsecondary} />
            <Pair title={"Nerve (Panic)"} info={stressString} format={{ heading: true }} />
            <h3>Defense Info</h3>
            <SpecialInfo info={def_skill} />
            <h3>Attack Info</h3>
            <SpecialInfo  info={atk_skill} />
            <h3>Skills</h3>
            { skills && 
            <Body>
                <SkillsDisplay skills={skills} />
            </Body>
            }
        </>
    )
}