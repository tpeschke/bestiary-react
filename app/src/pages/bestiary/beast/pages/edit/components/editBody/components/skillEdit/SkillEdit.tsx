import { useEffect } from 'react'
import Icon from '../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../components/UI/body/Body'
import { UpdateFunction } from '../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'
import AttackInfoEdit from '../components/info/AttackInfoEdit'
import DefenseInfoEdit from '../components/info/DefenseInfoEdit'
import './SkillEdit.css'
import { Skill, NonspecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"

interface Props {
    skillInfo: NonspecificSkillInfo,
    updateSkillInfo: UpdateFunction,
    roleID?: string
}

export default function SkillEdit({ skillInfo, updateSkillInfo, roleID = '' }: Props) {
    if (!skillInfo.skills) {
        return <></>
    }

    const { skills, attackInfo, defenseInfo } = skillInfo
    const { preferred, weakness, everythingElse, everythingElseStrength } = skills

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

    const removeSkillSuite = (key: 'preferred' | 'weakness', indexToRemove: number) => {
        if (skills && skills[key]) {
            const newSkillList = skills[key].filter((_, index) => index !== indexToRemove)

            const newSkills = {
                ...skills,
                [key]: newSkillList
            }

            updateSkillInfo('skills', newSkills)
        }
    }

    const toggleEverythingElseStrength = () => {
        if (skills) {
            const newSkills = {
                ...skills,
                everythingElseStrength: skills.everythingElseStrength ? null : 'x'
            }

            updateSkillInfo('skills', newSkills)
        }
    }

    return (
        <div className="skill-edit-body">
            <h2>Preferred</h2>
            {preferred?.map(formatSkillRow('preferred', updateSkillSuite, removeSkillSuite, roleID))}

            <h2>Weak</h2>
            {weakness?.map(formatSkillRow('weakness', updateSkillSuite, removeSkillSuite, roleID))}

            <h2>Everything Else</h2>
            <span className='everything-else-shell'>
                <button onClick={toggleEverythingElseStrength}>
                    {everythingElseStrength === 'x' ? 'U' : everythingElse}
                </button>
            </span>

            <Body>
                <AttackInfoEdit attackInfo={attackInfo} updateAttackInfo={updateSkillInfo} />
                <DefenseInfoEdit defenseInfo={defenseInfo} updateDefenseInfo={updateSkillInfo} />
            </Body>
        </div>
    )
}

type UpdateSkillSuite = (key: 'preferred' | 'weakness', indexToChange: number, value: string) => void
type RemoveSkillSuite = (key: 'preferred' | 'weakness', indexToRemove: number) => void

function formatSkillRow(key: 'preferred' | 'weakness', updateSkillSuite: UpdateSkillSuite, removeSkillSuite: RemoveSkillSuite, roleID: string) {
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
            <span key={index + roleID}>
                <select value={skill} onChange={event => updateSkillSuite(key, index, event.target.value)}>
                    {skillSuites.map(suite => <option key={suite} value={suite}>{suite} ({suiteStatDictionary[suite]})</option>)}
                </select>
                <p>{suiteStatDictionary[skill]}</p>
                <p>{rank}</p>
                <button className="orange" onClick={_ => removeSkillSuite(key, index)}>
                    <Icon iconName='trash' color='white' />
                </button>
            </span>
        )
    }
}