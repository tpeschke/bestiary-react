import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import RoleSelects from "../components/RoleSelects"

interface Props {
    updateSocialInfo: UpdateFunction,
    primaryRole: string,
    secondaryRole: string
}

export default function SocialRoleSelect({ updateSocialInfo, primaryRole, secondaryRole }: Props) {
    const primaryDictionary: string[] = [
        'Striker',
        'Defender',
        'Fast-Talker',
        'Feinter',
        'Sandbagger',
        'Corruptor',
        'Gaslighter',
        'Enabler',
        'Opportunist'
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