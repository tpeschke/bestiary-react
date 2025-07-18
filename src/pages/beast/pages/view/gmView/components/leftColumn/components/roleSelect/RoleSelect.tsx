import './RoleSelect.css'

import { useEffect, useState } from 'react';
import Select from 'react-select'
import RoleInfo, { Role, RoleSocialInfo, RoleSkillInfo, RoleCombatInfo } from '../../../../../../../../../../common/interfaces/beast/infoInterfaces/roleInfoInterfaces';
import QuickLink from '../../../../../../../components/QuickLink';
import { UpdateSelectedRoleFunction } from '../../../../../../../hooks/beastHooks';

interface Props {
    roleInfo: RoleInfo,
    updateSelectedRole: UpdateSelectedRoleFunction,
    selectedRoleIndex: number,
    copyQuickLink: Function,
    hasModifier: boolean
}

interface OptionProp {
    value: string,
    label: string,
}

export default function RoleSelect({ roleInfo, updateSelectedRole, selectedRoleIndex, copyQuickLink, hasModifier }: Props) {
    const [currentSelectedOption, setCurrentSelectedOption] = useState<OptionProp | null>(null)
    const [roleOptions, setRoleOptions] = useState<any[] | null>(null)

    useEffect(() => {
        const { roles } = roleInfo
        if (roles.length > 0) {
            setCurrentSelectedOption(getSelectedRole(roles, selectedRoleIndex))
        }
    }, [roleInfo, selectedRoleIndex]);

    useEffect(() => {
        if (!roleOptions && roleInfo.roles.length > 0) {
            const { roles } = roleInfo

            const options = roles.map(({ generalInfo, combatInfo, skillInfo, socialInfo, id: roleId }: Role): any => {
                const { name } = generalInfo

                const roleName = formatRoleName(socialInfo, skillInfo, combatInfo)

                return { value: roleId, label: `${name} : ${roleName}` }
            })

            setRoleOptions(options)
        }
    }, [roleOptions, currentSelectedOption])

    function updateRoleId(selectedOption: OptionProp | undefined) {
        if (selectedOption) {
            setCurrentSelectedOption(selectedOption)
            updateSelectedRole(selectedOption.value)
        }
    }

    return (
        <div className="role-select-shell">
            {roleOptions && (
                <>
                    <h2>Role</h2>
                    <Select
                        isSearchable
                        value={currentSelectedOption}
                        components={{ Option: formatOption }}
                        options={roleOptions}
                        onChange={(event: any) => updateRoleId(event)} />
                    <QuickLink copyQuickLink={copyQuickLink} hasModifier={hasModifier}/>
                </>
            )}
        </div>
    )
}

function getSelectedRole(roles: Role[], selectedRoleIndex: number) {
    const { id: roleId, generalInfo, socialInfo, skillInfo, combatInfo } = roles[selectedRoleIndex]
    const { name } = generalInfo

    const roleName = formatRoleName(socialInfo, skillInfo, combatInfo)

    return { value: roleId, label: `${name} : ${roleName}` }
}

function formatOption({ innerProps, label }: any) {
    const [name, roleName] = label.split(' : ')
    return <div {...innerProps} className='role-option'>{name} <span>{roleName}</span></div>
}

function formatRoleName(socialInfo: RoleSocialInfo, skillInfo: RoleSkillInfo, combatInfo: RoleCombatInfo): string {
    const { socialrole, socialsecondary } = socialInfo
    const { skillrole, skillsecondary } = skillInfo
    const { combatrole, combatsecondary } = combatInfo

    const socialRoleName = formatSingleRoleNamePair(socialrole, socialsecondary)
    const skillRoleName = formatSingleRoleNamePair(skillrole, skillsecondary)
    const combatRoleName = formatSingleRoleNamePair(combatrole, combatsecondary)

    return `${socialRoleName} / ${skillRoleName} / ${combatRoleName}`
}

function formatSingleRoleNamePair(main: string, secondary: string | null) {
    return `${main}${secondary ? ' (' + secondary + ')' : ''}`
}