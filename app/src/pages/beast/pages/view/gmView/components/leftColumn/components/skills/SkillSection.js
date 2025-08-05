import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import RoleTitle from "../../../roleTitle/RoleTitle";
import SkillsDisplay from "./components/SkillsDisplay";
import SpecialInfo from "../specialInfo/specialInfo";
import ObstaclesDisplay from "./components/Obstacles/ObstaclesDisplay";
import ChallengesDisplay from "./components/Challenges/ChallengesDisplay";
import Body from "../../../../../../../components/UI/body/Body";
import Pair from "../../../../../../../components/UI/pair/Pair";
export default function SkillSection({ skillInfo }) {
    const { skillrole, skillpoints, skills, atk_skill, def_skill, skillsecondary, panic, stress, obstacles, challenges } = skillInfo;
    let stressString = `${stress}`;
    if (panic) {
        stressString = `(${panic}) ` + stressString;
    }
    const showSkillSection = skills.length > 0;
    const showDefenseSection = def_skill && def_skill !== '';
    const showAttackSection = atk_skill && atk_skill !== '';
    const hasBottomBorder = !(showSkillSection || showDefenseSection || showAttackSection);
    return (_jsxs(_Fragment, { children: [_jsx(RoleTitle, { title: "Skills", points: skillpoints, role: skillrole, secondaryRole: skillsecondary }), _jsx(Pair, { title: "Nerve (Panic)", info: stressString, format: { heading: true, noBorder: hasBottomBorder } }), showDefenseSection &&
                _jsxs(_Fragment, { children: [_jsx("h3", { children: "Defense Info" }), _jsx(SpecialInfo, { info: def_skill })] }), showAttackSection &&
                _jsxs(_Fragment, { children: [_jsx("h3", { children: "Attack Info" }), _jsx(SpecialInfo, { info: atk_skill })] }), showSkillSection &&
                _jsxs(_Fragment, { children: [_jsx("h3", { children: "Skills" }), _jsx(Body, { children: _jsx(SkillsDisplay, { skills: skills }) })] }), obstacles.length > 0 && _jsx(ObstaclesDisplay, { obstacles: obstacles }), challenges.length > 0 && _jsx(ChallengesDisplay, { challenges: challenges })] }));
}
