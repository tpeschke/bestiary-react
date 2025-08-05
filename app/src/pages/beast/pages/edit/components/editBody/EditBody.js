import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";
export default function EditBody({ beast, updateSelectedRole, updateBeast, updateCombatInfoFunctions }) {
    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex, combatRoleType } = beast;
    const { name } = generalInfo;
    return (_jsxs(_Fragment, { children: [_jsx(NameHeader, { name: `Edit ${name}` }), _jsx(RoleSelect, { roleInfo: roleInfo, updateSelectedRole: updateSelectedRole, selectedRoleIndex: selectedRoleIndex }), _jsx(CombatEdit, { combatInfo: combatInfo, updateCombatInfoFunctions: updateCombatInfoFunctions, combatRoleType: combatRoleType }), _jsx("h2", { className: "border", children: "Save" }), _jsx("button", { className: "orange", onClick: updateBeast, children: "Save Entry" })] }));
}
