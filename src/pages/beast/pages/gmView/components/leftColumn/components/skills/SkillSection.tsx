import SkillInfo from "../../../../../../interfaces/infoInterfaces.ts/skillInfoInterfaces"

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
            <Pair title={"Nerve (Panic)"} info={stressString} format={{heading: true}}/>
            <Body>
                {skills ?
                    <SkillsDisplay skills={skills} />
                    : <></>}
            </Body>
            <SpecialInfo type="Attack" info={atk_skill} />
            <SpecialInfo type="Defense" info={def_skill} />
        </>
    )
}