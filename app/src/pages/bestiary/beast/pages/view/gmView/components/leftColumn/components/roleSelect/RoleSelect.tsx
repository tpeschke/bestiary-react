import './RoleSelect.css'

import { useEffect, useState } from 'react';
import RoleInfo, { Role, RoleSocialInfo, RoleSkillInfo, RoleCombatInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces';
import QuickLink from '../../../../../../../components/QuickLink';
import { UpdateSelectedRoleFunction } from '../../../../../../../hooks/beastHooks';

interface Props {
    roleInfo: RoleInfo,
    updateSelectedRole: UpdateSelectedRoleFunction,
    selectedRoleIndex: number,
    copyQuickLink?: Function,
    hasModifier?: boolean
}

interface OptionProp {
    roleName: string,
    rolesString: string,
    roleID: string
}

export default function RoleSelect({ roleInfo, updateSelectedRole, selectedRoleIndex, copyQuickLink, hasModifier = false }: Props) {
    const [currentSelectedOption, setCurrentSelectedOption] = useState<OptionProp | null>(null)
    const [roleOptions, setRoleOptions] = useState<OptionProp[] | null>(null)
console.log(currentSelectedOption)
    useEffect(() => {
        const { roles } = roleInfo
        if (roles.length > 0) {
            setCurrentSelectedOption(getSelectedRole(roles, selectedRoleIndex))
        }
    }, [roleInfo, selectedRoleIndex]);

    useEffect(() => {
        const { roles } = roleInfo

        const options: OptionProp[] = roles.map(({ generalInfo, combatInfo, skillInfo, socialInfo, id: roleID }: Role): any => {
            const { name: roleName } = generalInfo
            const rolesString = formatRoleName(socialInfo, skillInfo, combatInfo)

            return {
                roleName,
                rolesString,
                roleID
            }
        })

        setRoleOptions(options)
    }, [roleInfo])

    function updateRole(selectedOption: OptionProp | undefined) {
        if (selectedOption) {
            setCurrentSelectedOption(selectedOption)
            updateSelectedRole(selectedOption.roleID)
        }
    }

    return (
        <div className="role-select-shell">
            {roleOptions && roleOptions.length > 0 && (
                <>
                    <h3>Roles</h3>
                    <div className='role-options'>
                        {roleOptions.map(option => {
                            return (
                                <button disabled={currentSelectedOption?.roleID === option.roleID} key={option.roleID} onClick={_ => updateRole(option)}>
                                    {option.roleName}
                                    <span>{option.rolesString} </span>
                                </button>
                            )
                        })}
                    </div>
                    <div className='current-role-name'>
                        <h2>{currentSelectedOption?.roleName}</h2>
                        {copyQuickLink && <QuickLink copyQuickLink={copyQuickLink} hasModifier={hasModifier} />}
                    </div>
                </>
            )}
        </div>
    )
}

function getSelectedRole(roles: Role[], selectedRoleIndex: number) {
    const { id: roleID, generalInfo, socialInfo, skillInfo, combatInfo } = roles[selectedRoleIndex]
    const { name: roleName } = generalInfo

    const rolesString = formatRoleName(socialInfo, skillInfo, combatInfo)

    return {
        roleName,
        rolesString,
        roleID
    }
}

function formatRoleName(socialInfo: RoleSocialInfo, skillInfo: RoleSkillInfo, combatInfo: RoleCombatInfo): string {
    const { socialRole, socialSecondary } = socialInfo
    const { skillRole, skillSecondary } = skillInfo
    const { combatRole, combatSecondary } = combatInfo

    const socialRoleName = formatSingleRoleNamePair(socialRole, socialSecondary)
    const skillRoleName = formatSingleRoleNamePair(skillRole, skillSecondary)
    const combatRoleName = formatSingleRoleNamePair(combatRole, combatSecondary)

    return `${socialRoleName} / ${skillRoleName} / ${combatRoleName}`
}

function formatSingleRoleNamePair(main: string, secondary: string | null) {
    return `${secondary ? secondary + ' ' : ''} ${main}`
}