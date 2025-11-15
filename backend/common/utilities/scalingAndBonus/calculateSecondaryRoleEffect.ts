export default function calculateSecondaryRoleEffect(base: number, secondaryRole: string | null) {
    switch (secondaryRole) {
        case 'Lesser':
            return Math.ceil(base * 0.5)
        case 'Veteran':
        case 'Officer':
            return Math.ceil(base * 2.5)
        case 'Solo':
            return Math.ceil(base * 3.5)
        default:
            return base
    }
}