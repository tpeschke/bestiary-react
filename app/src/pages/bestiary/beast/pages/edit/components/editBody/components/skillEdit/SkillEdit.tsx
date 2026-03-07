import { UpdateFunction } from '../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'
import './SkillEdit.css'
import SkillInfo, { Skill } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"

interface Props {
    skillInfo: SkillInfo,
    updateSkillInfo: UpdateFunction
}

export default function SkillEdit({ skillInfo, updateSkillInfo }: Props) {
    const { skills } = skillInfo
    const { preferred, weakness, everythingElse } = skills

    const updateSkillSuite = (key: 'preferred' | 'weakness', indexToChange: number, value: string) => {
        if (skills && skills[key]) {
            const newSkillList = skills[key].map((skill, index) => {
                if (index === indexToChange) {
                    return {
                        ...skill,
                        skill: value
                    }
                }
                return skill
            })

            const newSkills = {
                ...skills,
                [key]: newSkillList
            }

            updateSkillInfo('skills', newSkills)
        }
    }

    return (
        <div className="skill-edit-body">
            <h2>Preferred</h2>
            {preferred?.map(formatSkillRow('preferred', updateSkillSuite))}

            <h2>Weak</h2>
            {weakness?.map(formatSkillRow('weakness', updateSkillSuite))}

            <h2>Everything Else</h2>
            <span>
                <p>{everythingElse}</p>
                {/* <button className="orange">
                    x
                </button> */}
            </span>
        </div>
    )
}

type UpdateSkillSuite = (key: 'preferred' | 'weakness', indexToChange: number, value: string) => void

function formatSkillRow(key: 'preferred' | 'weakness', updateSkillSuite: UpdateSkillSuite) {
    return ({ skill, rank }: Skill, index: number) => {
        const skillSuites = ['Athletics', 'Lore', 'Strategy', 'Streetwise', 'Survival', 'Trades', 'Weirdcraft']

        const suiteStatDictionary: { [key: string]: string } = {
            Athletics: 'Str / Con',
            Lore: 'Mem',
            Strategy: 'Ins / Pre',
            Streetwise: 'Ins / Pre',
            Survival: 'Con / Ins',
            Trades: 'Dex / Mem',
            Weirdcraft: 'Mem / Ins'
        }

        return (
            <span key={index}>
                <select value={skill} onChange={event => updateSkillSuite(key, index, event.target.value)}>
                    {skillSuites.map(suite => <option value={suite}>{suite} ({suiteStatDictionary[suite]})</option>)}
                </select>
                <p>{suiteStatDictionary[skill]}</p>
                <p>{rank}</p>
                {/* <button className="orange">
                    <Icon iconName='trash' color='white' />
                </button> */}
            </span>
        )
    }
}