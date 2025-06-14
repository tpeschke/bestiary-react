import './RoleSelect.css'

import RoleInfo, { Role } from "../../../../../../interfaces/infoInterfaces/roleInfoInterfaces";
import { useState } from 'react';

interface Props {
    roleInfo: RoleInfo,
    updateSelectedRole: Function,
    selectedRole: string
}


export default function RoleSelect({ roleInfo, updateSelectedRole, selectedRole }: Props) {
    const [selectedRoleId, setSelectedRoleId] = useState(selectedRole)
    const { roles } = roleInfo

    function updateRoleId(newRoleId: string) {
        setSelectedRoleId(newRoleId)
        updateSelectedRole(newRoleId)
    }

    return (
        <div className="role-select-shell">
            <h2>Role</h2> 
            <select value={selectedRoleId} onChange={event => updateRoleId(event.target.value)}>
                {roles.map(({ generalInfo, id: roleId }: Role, index) => {
                    const { name } = generalInfo
                    return <option key={index} value={roleId}>{name}</option>
                })}
            </select>
        </div>
    )
}