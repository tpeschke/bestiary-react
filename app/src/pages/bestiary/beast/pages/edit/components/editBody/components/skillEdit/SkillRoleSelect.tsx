import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import RoleSelects from "../components/RoleSelects"

interface Props {
    updateSkillInfo: UpdateFunction,
    primaryRole: string,
    secondaryRole: string
}

export default function SkillRoleSelect({ updateSkillInfo, primaryRole, secondaryRole }: Props) {
    const primaryDictionary: string[] = [
        'Generalist',
        'Lock',
        'Athlete',
        'Loremaster',
        'Strategist',
        'Street-Rat',
        'Survivalist',
        'Trader',
        'Weirdling',
    ]

    return <RoleSelects
        updateFunction={updateSkillInfo}
        primaryRole={primaryRole}
        secondaryRole={secondaryRole}
        primaryKey={'skillRole'}
        secondaryKey={'skillSecondary'}
        primaryDictionary={primaryDictionary}
    />
}