import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import SpecialInfo from "../../../specialInfo/specialInfo";
import AttackStats from "./components/AttackStats";
import ReferenceView from "./components/ReferenceView";
export default function AttackDisplay({ sp_atk, attacks }) {
    const showSection = sp_atk || attacks.length > 0;
    return (_jsx(_Fragment, { children: showSection &&
            _jsxs(_Fragment, { children: [_jsx("h3", { children: "Attack Info" }), _jsx(SpecialInfo, { info: sp_atk }), attacks.map((attack, index) => {
                        if (attack.infoType === 'weapon') {
                            return _jsx(AttackStats, { attackStat: attack }, index);
                        }
                        else if (attack.infoType === 'reference') {
                            return _jsx(ReferenceView, { referenceInfo: attack }, index);
                        }
                    })] }) }));
}
