import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay";
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay";
export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType }) {
    const { updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, updateAttackInfo, updateDefenseInfo, removeAttack } = updateCombatInfoFunctions;
    const { attacks, defenses } = combatInfo;
    return (_jsxs(_Fragment, { children: [_jsx(AttacksEditDisplay, { attacks: attacks, updateAttackOrder: updateAttackOrder, addAttack: addAttack, updateAttackInfo: updateAttackInfo, combatRoleType: combatRoleType, removeAttack: removeAttack }), _jsx(DefenseEditDisplay, { defenses: defenses, updateDefenseOrder: updateDefenseOrder, removeDefense: removeDefense, updateDefenseInfo: updateDefenseInfo })] }));
}
