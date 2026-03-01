import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import RoleSelects from "../components/RoleSelects"

interface Props {
    updateSocialInfo: UpdateFunction,
    primaryRole: string,
    secondaryRole: string
}

export default function SocialRoleSelect({ updateSocialInfo, primaryRole, secondaryRole }: Props) {
    const primaryDictionary: string[] = [
        'Advocate',
        'Bully',
        'Charmer',
        'Empath',
        'Enabler',
        'Instructor',
        'Obdurate',
        'Zealot'
    ]

    return <RoleSelects
        updateFunction={updateSocialInfo}
        primaryRole={primaryRole}
        secondaryRole={secondaryRole}
        primaryKey={'socialRole'}
        secondaryKey={'socialSecondary'}
        primaryDictionary={primaryDictionary}
    />
}