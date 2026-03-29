import { Skill, SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Pair from "../../../../../../../../components/UI/pair/Pair"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

interface Props {
    skills: SkillObject | undefined,
    type: SystemOption
}

export default function SkillsDisplay({ skills, type }: Props) {
    if (!skills) {
        return <></>
    }

    const { preferred, weakness, everythingElse, everythingElseStrength } = skills

    return (
        <div className={preferred || weakness ? "skill-object-shell" : ''}>
            <div className="skill-object">
                {preferred && displaySkillArray(preferred, type)}
                {weakness && displaySkillArray(weakness, type)}
            </div>
            <Pair title={`Everything${preferred || weakness ? ' Else' : ''}`} info={everythingElseStrength ? 'U' : everythingElse} format={{ title: 'none' }} />
        </div>
    )
}

function displaySkillArray(array: Skill[], type: SystemOption) {
    const [major, minor] = array
    return (
        <div>
            {major && <Pair title={major.skill} info={major.rank + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />}
            {minor && <Pair title={minor.skill} info={minor.rank + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />}
        </div>
    )
}