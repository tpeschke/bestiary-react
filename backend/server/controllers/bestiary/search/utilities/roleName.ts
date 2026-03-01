export function getSocialRoleName(roleID: string | number): string {
    roleID = +roleID

    const roleArray = [
        null,
        'Advocate',
        'Bully',
        'Charmer',
        'Empath',
        'Enabler',
        'Instructor',
        'Obdurate',
        'Zealot', // 8
        'Lesser',
        'Veteran',
        'Champion',
        'Officer',
        'Tyrant',
        'Solo', // 14
    ]

    const roleName = roleArray[roleID]

    if (roleName) {
        return roleName
    }
    return ''
}

export function getCombatRoleName(roleID: string | number): string {
    roleID = +roleID

    const roleArray = [
        null,
        'Artillery',
        'Brute',
        'Defender',
        'Duelist',
        'Shock',
        'Skirmisher', // 6
        'Lesser',
        'Veteran',
        'Champion',
        'Officer',
        'Tyrant',
        'Solo', // 12
    ]

    const roleName = roleArray[roleID]

    if (roleName) {
        return roleName
    }
    return ''
}

export function getSkillRoleName(roleID: string | number): string {
    roleID = +roleID

    const roleArray = [
        null,
        'Generalist',
        'Lock',
        'Athlete',
        'Loremaster',
        'Strategist',
        'Street-Rat',
        'Survivalist',
        'Trader',
        'Weirdling', // 9
        'Lesser',
        'Veteran',
        'Champion',
        'Officer',
        'Tyrant',
        'Solo', // 15
    ]

    const roleName = roleArray[roleID]

    if (roleName) {
        return roleName
    }
    return ''
}