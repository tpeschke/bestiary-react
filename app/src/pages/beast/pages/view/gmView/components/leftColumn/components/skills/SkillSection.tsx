import RoleTitle from "../../../roleTitle/RoleTitle"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay"
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay"
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../components/UI/pair/Pair"


interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillRole, skillSkulls, skills, attackInfo, defenseInfo, skillSecondary, stress, obstacles, challenges } = skillInfo

    const showSkillSection = skills.length > 0
    const showDefenseSection = defenseInfo && defenseInfo !== ''
    const showAttackSection = attackInfo && attackInfo !== ''

    const hasBottomBorder: boolean = !(showSkillSection || showDefenseSection || showAttackSection)

    return (
        <>
            <RoleTitle title="Skills" skulls={skillSkulls} role={skillRole} secondaryRole={skillSecondary} />
            <Pair title={"Stress Threshold"} info={stress} format={{ heading: true, noBorder: hasBottomBorder }} />
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