import './SkillSection.css'

import RoleTitle from "../../../roleTitle/RoleTitle"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay"
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay"
import { SpecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Icon from '../../../../../../../../../../components/icon/Icon'
import getEliteInfo from '../utilities/getEliteInfo'
import getLesserInfo from '../utilities/getLesserInfo'
import getSoloInfo from '../utilities/getSoloInfo'

interface Props {
    skillInfo: SpecificSkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { type, skillRole, skillSkulls, skillEpValue, skills, attackInfo, defenseInfo, skillSecondary, stress, obstacles, challenges } = skillInfo

    const { threshold } = stress

    const showSkillSection = skills?.preferred || skills?.weakness || skills?.everythingElseStrength !== 'x'

    const showThreshold = threshold && type === 'Bonfire'

    const lesserBonus = getLesserInfo(skillSecondary, type)
    const eliteBonus = getEliteInfo(skillSecondary, type)
    const soloBonus = getSoloInfo(skillSecondary, type)

    // if HM info is null, the code uses the Bonfire info to generate it
    // So if we want Bonfire info but not HM info, we need to leave a placeholder, hence to '<p></p>'
    const showDefenseSection = !!defenseInfo && defenseInfo !== '<p></p>' || lesserBonus || eliteBonus || soloBonus
    const showAttackSection = !!attackInfo && attackInfo !== '<p></p>'

    const showObstacles = obstacles.length > 0
    const showChallenges = challenges.length > 0

    const hasBottomBorder = !(showThreshold || showSkillSection || showDefenseSection || showAttackSection || showObstacles || showChallenges)
    const thresholdHasBottomBorder: boolean = !(showSkillSection || showDefenseSection || showAttackSection)

    return (
        <>
            {type === 'Bonfire' ?
                <RoleTitle title="Skills" skulls={skillSkulls} role={skillRole} secondaryRole={skillSecondary} hasBottomBorder={hasBottomBorder} />
                :
                <RoleTitle title="Skills" epValue={skillEpValue} role={skillRole} secondaryRole={skillSecondary} hasBottomBorder={hasBottomBorder} />
            }
            {showThreshold && (
                <div className={"pair-shell heading three" + (thresholdHasBottomBorder ? " noBorder" : "")}>
                    <h3>Stress Threshold</h3>
                    <p>{threshold}</p>
                </div>
            )}
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={defenseInfo + (lesserBonus ?? '') + (eliteBonus ?? '') + (soloBonus ?? '')} />
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
                        <SkillsDisplay skills={skills} type={type} />
                    </Body>
                </>
            }
            {showObstacles && <ObstaclesDisplay obstacles={obstacles} />}
            {showChallenges && <ChallengesDisplay challenges={challenges} />}
        </>
    )
}