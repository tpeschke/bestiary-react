import { Skill, SkillObject } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Pair from "../../../../../../../../components/UI/pair/Pair"

interface Props {
    skills: SkillObject
}

export default function SkillsDisplay({ skills }: Props) {
    const { preferred, weakness, everythingElse } = skills

    return (
        <div className={preferred || weakness ? "skill-object-shell" : ''}>
            <div className="skill-object">
                {preferred && displaySkillArray(preferred)}
                {weakness && displaySkillArray(weakness)}
            </div>
            <Pair title={`Everything${preferred || weakness ? ' Else' : ''}`} info={everythingElse} format={{ title: 'none' }} />
        </div>
    )
}

function displaySkillArray(array: Skill[]) {
    const [major, minor] = array
    return (
        <div>
            <Pair title={major.skill} info={major.rank} format={{ title: 'none' }} />
            <Pair title={minor.skill} info={minor.rank} format={{ title: 'none' }} />
        </div>
    )
}