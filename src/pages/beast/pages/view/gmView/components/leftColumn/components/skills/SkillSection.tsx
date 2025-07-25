import RoleTitle from "../../../roleTitle/RoleTitle"
import SkillsDisplay from "./components/SkillsDisplay"
import SpecialInfo from "../specialInfo/specialInfo"
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay"
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay"
import SkillInfo from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../components/UI/pair/Pair"


interface Props {
    skillInfo: SkillInfo
}

export default function SkillSection({ skillInfo }: Props) {
    const { skillrole, skillpoints, skills, atk_skill, def_skill, skillsecondary, panic, stress, obstacles, challenges } = skillInfo

    let stressString = `${stress}`
    if (panic) { stressString = `(${panic}) ` + stressString }

    const showSkillSection = skills.length > 0
    const showDefenseSection = def_skill && def_skill !== ''
    const showAttackSection = atk_skill && atk_skill !== ''

    const hasBottomBorder: boolean = !(showSkillSection || showDefenseSection || showAttackSection)

    return (
        <>
            <RoleTitle title="Skills" points={skillpoints} role={skillrole} secondaryRole={skillsecondary} />
            <Pair title={"Nerve (Panic)"} info={stressString} format={{ heading: true, noBorder: hasBottomBorder }} />
            {showDefenseSection &&
                <>
                    <h3>Defense Info</h3>
                    <SpecialInfo info={def_skill} />
                </>
            }
            {showAttackSection &&
                <>
                    <h3>Attack Info</h3>
                    <SpecialInfo info={atk_skill} />
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