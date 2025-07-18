import '../EncounterDisplay.css'

import { GroupInfo, RoleNumbers } from '../interfaces/EncounterInterfaces'

interface Props {
    groupInfo: GroupInfo
}

export default function NumberAppearingDisplay({ groupInfo }: Props) {
    const { label, roleNumbers } = groupInfo

    function formatNumberAppearing(roles: RoleNumbers) {
        return Object.keys(roles).reduce((totalString: string, role: string, index: number, roleArray: any[]) => {
            const number = roles[role]
            const roleName = number > 1 ? role + 's' : role

            const roleString = ` ${number} ${roleName}`
            if (index > 0 && index === roleArray.length - 1) {
                return totalString + ', and ' + roleString
            } else if (index > 0) {
                return totalString + ', ' + roleString
            }  
            return totalString += ` ${number} ${roleName}`
        }, '')
    }

    return (
        <div className='number-appearing-shell'>
            <h3>Number Appearing </h3>
            <p>A {label} of {formatNumberAppearing(roleNumbers)}</p>
        </div>
    )
}