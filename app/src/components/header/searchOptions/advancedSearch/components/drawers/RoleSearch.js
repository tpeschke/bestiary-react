import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './DrawerSearch.css';
import Checkbox from "../../../../../checkbox/Checkbox";
import { combatPrimaryDictionary, combatSecondaryDictionary, confrontationPrimaryDictionary, confrontationSecondaryDictionary, skillPrimaryDictionary, skillSecondaryDictionary } from '../../utilities/searchDictionaries';
export default function RoleSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return {
        label: 'Roles',
        innards: formatRoles(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    };
}
function formatRoles(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return (_jsxs("div", { className: 'search-roles-shell', children: [_jsxs("div", { children: [_jsx("h4", { children: "Confrontation Roles" }), confrontationPrimaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index)), _jsx("p", { className: 'italic', children: "Secondaries" }), confrontationSecondaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index))] }), _jsxs("div", { children: [_jsx("h4", { children: "Combat Roles" }), combatPrimaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index)), _jsx("p", { className: 'italic', children: "Secondaries" }), combatSecondaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index))] }), _jsxs("div", { children: [_jsx("h4", { children: "Challenge Roles" }), skillPrimaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index)), _jsx("p", { className: 'italic', children: "Secondaries" }), skillSecondaryDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('roles', id) }, index))] })] }));
}
