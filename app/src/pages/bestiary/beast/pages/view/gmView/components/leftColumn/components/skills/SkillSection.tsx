import './SkillSection.css'

import RoleTitle from "../../../roleTitle/RoleTitle"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay"
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay"
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Icon from '../../../../../../../../../../components/icon/Icon'
import { hasSystemInfoContent } from "../../../../../../../utilities/getSystemInfo"

interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { type, skillRole, skillSkulls, skillRawEpValue, skills, attackInfo, defenseInfo, skillSecondary, stress, obstacles, challenges } = skillInfo

    const { threshold, defenseNFleeDice } = stress
    const { defense, flee } = defenseNFleeDice

    const showSkillSection = skills?.preferred || skills?.weakness || skills?.everythingElseStrength !== 'x'
    const showDefenseSection = hasSystemInfoContent(defenseInfo, type)
    const showAttackSection = hasSystemInfoContent(attackInfo, type)

    const hasBottomBorder: boolean = !(showSkillSection || showDefenseSection || showAttackSection)

    const showThreshold = threshold && type === 'Bonfire'

    return (
        <>
            {type === 'Bonfire' ?
                <RoleTitle title="Skills" skulls={skillSkulls} role={skillRole} secondaryRole={skillSecondary} />
                :
                <RoleTitle title="Skills" epValue={skillRawEpValue} role={skillRole} secondaryRole={skillSecondary} />
            }
            {showThreshold && (
                <div className={"pair-shell heading three" + (hasBottomBorder ? " noBorder" : "")}>
                    <h3>Stress Threshold</h3>
                    <p>
                        <span data-tooltip-id="my-tooltip" data-tooltip-content="At this dice size, the enemy becomes defensive and fleeing is free."><Icon iconName="shield" color='blue' /> {defense}</span>
                        <span> / </span>
                        <span data-tooltip-id="my-tooltip" data-tooltip-content="At this dice size, the enemy flees the battlefield."><Icon iconName="run" color='blue' /> {flee}</span>
                    </p>
                    <p>{threshold}</p>
                </div>
            )}
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo} system={type} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={attackInfo} system={type} />
                </>
            }
            {showSkillSection &&
                <>
                    <h3>Skills</h3>
                    <Body>
                        <SkillsDisplay skills={skills} type={type} />
                    </Body>
                </>
            }
            {obstacles.length > 0 && <ObstaclesDisplay obstacles={obstacles} />}
            {challenges.length > 0 && <ChallengesDisplay challenges={challenges} />}
        </>
    )
}