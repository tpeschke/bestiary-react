import './RoleSelect.css'

import RoleInfo, { Role } from "../../../../../../interfaces/infoInterfaces/roleInfoInterfaces";
import { useEffect, useState } from 'react';
import { UpdateSelectedRoleFunction } from '../../../../../../hooks/beastHooks';
import Select from 'react-select'

interface Props {
    roleInfo: RoleInfo,
    updateSelectedRole: UpdateSelectedRoleFunction,
    selectedRole: string
}

interface OptionProp {
    value: string,
    label: string,
}

export default function RoleSelect({ roleInfo, updateSelectedRole, selectedRole }: Props) {
    const [currentSelectedOption, setCurrentSelectedOption] = useState<OptionProp | null>(null)
    const [roleOptions, setRoleOptions] = useState<any[] | null>(null)

    useEffect(() => {
        if (!roleOptions) {
            const { roles } = roleInfo

            const options = roles.map(({ generalInfo, combatInfo, skillInfo, socialInfo, id: roleId }: Role): any => {
                const { name } = generalInfo
                const { socialrole, socialsecondary } = socialInfo
                const { skillrole, skillsecondary } = skillInfo
                const { combatrole, combatsecondary } = combatInfo

                const roleName = formatRoleName(socialrole, socialsecondary, skillrole, skillsecondary, combatrole, combatsecondary)

                if (roleId === selectedRole) { setCurrentSelectedOption({ value: roleId, label: `${name} : ${roleName}` }) }

                return { value: roleId, label: `${name} : ${roleName}` }
            })

            setRoleOptions(options)
        }
    }, [currentSelectedOption, roleOptions]);

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
                        defaultValue={currentSelectedOption}
                        components={{ Option: formatOption }}
                        options={roleOptions}
                        onChange={(event: any) => updateRoleId(event)} />
                </>
            )}
        </div>
    )
}

function formatOption({ innerProps, label }: any) {
    const [name, roleName] = label.split(' : ')
    return <div {...innerProps} className='role-option'>{name} <span>{roleName}</span></div>
}

function formatRoleName(socialRole: string, socialSecondary: string | null, skillRole: string, skillSecondary: string | null, combatRole: string, combatSecondary: string | null) {
    const socialRoleName = formatSingleRoleNamePair(socialRole, socialSecondary)
    const skillRoleName = formatSingleRoleNamePair(skillRole, skillSecondary)
    const combatRoleName = formatSingleRoleNamePair(combatRole, combatSecondary)

    return `${socialRoleName} / ${skillRoleName} / ${combatRoleName}`
}

function formatSingleRoleNamePair(main: string, secondary: string | null) {
    return `${main}${secondary ? ' (' + secondary + ')' : ''}`
}