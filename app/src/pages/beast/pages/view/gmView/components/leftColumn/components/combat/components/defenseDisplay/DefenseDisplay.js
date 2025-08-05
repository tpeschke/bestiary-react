import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import SpecialInfo from "../../../specialInfo/specialInfo";
import DefenseStats from "./components/DefenseStats";
export default function DefenseDisplay({ sp_def, defenses }) {
    const hasDefenses = defenses.length > 0;
    const hasSpecialDefenses = !!sp_def;
    const showSection = hasSpecialDefenses || hasDefenses;
    const hasSpecificName = defenses[0]?.name || defenses[0]?.defensename;
    const hasMultipleDefenses = defenses.length > 1;
    const showDefenseNameBanner = !!(hasMultipleDefenses || (!hasMultipleDefenses && hasSpecialDefenses) || (!hasMultipleDefenses && hasSpecificName));
    return (_jsx(_Fragment, { children: showSection &&
            _jsxs(_Fragment, { children: [_jsx("h3", { children: "Defense Info" }), _jsx(SpecialInfo, { info: sp_def }), defenses.map((defense, index) => _jsx(DefenseStats, { defenseStats: defense, showDefenseNameBanner: showDefenseNameBanner }, index))] }) }));
}
