import getModBySkullIndex from "../../getModBySkullIndex"

export default function getShieldDamage(isRanged: boolean, role: string, skullIndex: number) {
    const recoveryDictionary = [
        '0', '0', '0', '0', '0', '1', '1d4p', '1d6p', '1d8p', '1d10p', '1d12p', '1d12p+2', '1d12p+3', '1d12p+4', '1d12p+5', '1d12p+6', '1d12p+7', '1d12p+8', '1d12p+9', '1d12p+10', '1d12p+11', '1d12p+12', '1d12p+13', '1d12p+14', '1d12p+16', '1d12p+17', '1d12p+18', '1d12p+19', '1d12p+20', '1d12p+21', '1d12p+22', '1d12p+23', '1d12p+24', '1d12p+25', '1d12p+26', '1d12p+27', '1d12p+28', '1d12p+30', '1d12p+31', '1d12p+32', '1d12p+33'
    ]

    if (isRanged) {
        return '0'
    }

    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, recoveryDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return -2
        case 'Brute':
            return 4
        case 'Defender':
            return 0
        case 'Duelist':
            return 2
        case 'Shock':
            return 4
        case 'Skirmisher':
            return -4
        default:
            return 0
    }
}