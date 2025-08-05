import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Pair from "../../../../../../../../components/UI/pair/Pair";
export default function SkillsDisplay({ skills }) {
    return (_jsx(_Fragment, { children: skills.map(({ skill, rank }, index) => _jsx(Pair, { title: skill, info: rank, format: { title: 'none' } }, index)) }));
}
