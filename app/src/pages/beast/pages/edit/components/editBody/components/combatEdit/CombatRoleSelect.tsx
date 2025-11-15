import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import RoleSelects from "../components/RoleSelects"

interface Props {
    updateCombatInfo: UpdateFunction,
    primaryRole: string,
    secondaryRole: string
}

export default function CombatRoleSelect({ updateCombatInfo, primaryRole, secondaryRole }: Props) {
    const primaryDictionary: string[] = [
        'Artillery',
        'Brute',
        'Defender',
        'Duelist',
        'Shock',
        'Skirmisher'
    ]

    return <RoleSelects
        updateFunction={updateCombatInfo}
        primaryRole={primaryRole}
        secondaryRole={secondaryRole}
        primaryKey={'combatRole'}
        secondaryKey={'combatSecondary'}
        primaryDictionary={primaryDictionary}
    />
}