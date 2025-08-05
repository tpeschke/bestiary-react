import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './RoleSelect.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import QuickLink from '../../../../../../../components/QuickLink';
export default function RoleSelect({ roleInfo, updateSelectedRole, selectedRoleIndex, copyQuickLink, hasModifier = false }) {
    const [currentSelectedOption, setCurrentSelectedOption] = useState(null);
    const [roleOptions, setRoleOptions] = useState(null);
    useEffect(() => {
        const { roles } = roleInfo;
        if (roles.length > 0) {
            setCurrentSelectedOption(getSelectedRole(roles, selectedRoleIndex));
        }
    }, [roleInfo, selectedRoleIndex]);
    useEffect(() => {
        if (!roleOptions && roleInfo.roles.length > 0) {
            const { roles } = roleInfo;
            const options = roles.map(({ generalInfo, combatInfo, skillInfo, socialInfo, id: roleId }) => {
                const { name } = generalInfo;
                const roleName = formatRoleName(socialInfo, skillInfo, combatInfo);
                return { value: roleId, label: `${name} : ${roleName}` };
            });
            setRoleOptions(options);
        }
    }, [roleOptions, currentSelectedOption]);
    function updateRoleId(selectedOption) {
        if (selectedOption) {
            setCurrentSelectedOption(selectedOption);
            updateSelectedRole(selectedOption.value);
        }
    }
    return (_jsx("div", { className: "role-select-shell", children: roleOptions && (_jsxs(_Fragment, { children: [_jsx("h2", { children: "Role" }), _jsx(Select, { isSearchable: true, value: currentSelectedOption, components: { Option: formatOption }, options: roleOptions, onChange: (event) => updateRoleId(event) }), copyQuickLink && _jsx(QuickLink, { copyQuickLink: copyQuickLink, hasModifier: hasModifier })] })) }));
}
function getSelectedRole(roles, selectedRoleIndex) {
    const { id: roleId, generalInfo, socialInfo, skillInfo, combatInfo } = roles[selectedRoleIndex];
    const { name } = generalInfo;
    const roleName = formatRoleName(socialInfo, skillInfo, combatInfo);
    return { value: roleId, label: `${name} : ${roleName}` };
}
function formatOption({ innerProps, label }) {
    const [name, roleName] = label.split(' : ');
    return _jsxs("div", { ...innerProps, className: 'role-option', children: [name, " ", _jsx("span", { children: roleName })] });
}
function formatRoleName(socialInfo, skillInfo, combatInfo) {
    const { socialrole, socialsecondary } = socialInfo;
    const { skillrole, skillsecondary } = skillInfo;
    const { combatrole, combatsecondary } = combatInfo;
    const socialRoleName = formatSingleRoleNamePair(socialrole, socialsecondary);
    const skillRoleName = formatSingleRoleNamePair(skillrole, skillsecondary);
    const combatRoleName = formatSingleRoleNamePair(combatrole, combatsecondary);
    return `${socialRoleName} / ${skillRoleName} / ${combatRoleName}`;
}
function formatSingleRoleNamePair(main, secondary) {
    return `${main}${secondary ? ' (' + secondary + ')' : ''}`;
}
