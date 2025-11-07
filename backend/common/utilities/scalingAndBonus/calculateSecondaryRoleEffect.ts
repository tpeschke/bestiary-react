export default function calculateSecondaryRoleEffect(base: number, secondaryRole: string | null) {
    switch (secondaryRole) {
        case 'Lesser':
            return base * 0.5
        case 'Veteran':
        case 'Officer':
            return base * 2.5
        case 'Solo':
            return base * 3.5
        default:
            return base
    }
}