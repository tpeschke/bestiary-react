import './SkillSection.css'

import RoleTitle from "../../../roleTitle/RoleTitle"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay"
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay"
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Icon from '../../../../../../../../../../components/icon/Icon'

interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillRole, skillSkulls, skills, attackInfo, defenseInfo, skillSecondary, stress, obstacles, challenges } = skillInfo

    const { threshold, defenseNFleeDice } = stress
    const { defense, flee } = defenseNFleeDice

    const showSkillSection = skills?.preferred || skills?.weakness || skills?.everythingElse || skills?.everythingElse === 0
    const showDefenseSection = defenseInfo && defenseInfo !== ''
    const showAttackSection = attackInfo && attackInfo !== ''

    const hasBottomBorder: boolean = !(showSkillSection || showDefenseSection || showAttackSection)

    return (
        <>
            <RoleTitle title="Skills" skulls={skillSkulls} role={skillRole} secondaryRole={skillSecondary} />
            {threshold && (
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
                    <SpecialInfo info={defenseInfo} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={attackInfo} />
                </>
            }
            {showSkillSection &&
                <>
                    <h3>Skills</h3>
                    <Body>
                        <SkillsDisplay skills={skills} />
                    </Body>
                </>
            }
            {obstacles.length > 0 && <ObstaclesDisplay obstacles={obstacles} />}
            {challenges.length > 0 && <ChallengesDisplay challenges={challenges} />}
        </>
    )
}