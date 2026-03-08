import { Skill, SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Pair from "../../../../../../../../components/UI/pair/Pair"

interface Props {
    skills: SkillObject | undefined
}

export default function SkillsDisplay({ skills }: Props) {
    if (!skills) {
        return <></>
    }

    const { preferred, weakness, everythingElse, everythingElseStrength } = skills

    return (
        <div className={preferred || weakness ? "skill-object-shell" : ''}>
            <div className="skill-object">
                {preferred && displaySkillArray(preferred)}
                {weakness && displaySkillArray(weakness)}
            </div>
            <Pair title={`Everything${preferred || weakness ? ' Else' : ''}`} info={everythingElseStrength ? 'U' : everythingElse} format={{ title: 'none' }} />
        </div>
    )
}

function displaySkillArray(array: Skill[]) {
    const [major, minor] = array
    return (
        <div>
            {major && <Pair title={major.skill} info={major.rank} format={{ title: 'none' }} />}
            {minor && <Pair title={minor.skill} info={minor.rank} format={{ title: 'none' }} />}
        </div>
    )
}