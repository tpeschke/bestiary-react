export default function getRoleName(roleID: number): string {
    const roleArray = [
        null,
        'Striker',
        'Defender',
        'Fast-Talker',
        'Feinter',
        null,
        'Sandbagger',
        'Corruptor',
        'Gaslighter',
        'Enabler',
        'Opportunist',
        'Artillery',
        'Brute',
        'Captain',
        'Controller',
        'Defender',
        'Duelist',
        'Shock',
        'Skirmisher',
        'Solo', // Combat
        'Hunter',
        'Prey',
        'Controller',
        'Lock',
        null,
        'Antagonist',
        'Trap',
        'Hazard',
        'Lesser', // Combat
        'Veteran', // Combat
        'Veteran', // Confrontation
        'Solo', // Confrontation
        'Veteran', // Skill
        'Solo', // Skill
        'Solo', // Skill
        'Champion', // Combat
        'Officer', // Combat
        'Tyrant', // Combat
        'Lesser', // Skill
        'Champion', // Skill
        'Officer', // Skill
        'Tyrant', // Skill
        'Lesser', // Confrontation
        'Champion', // Confrontation
        'Officer', // Confrontation
        'Tyrant', // Confrontation 47
    ]
    const roleName = roleArray[roleID]

    if (roleName) {
        return roleName
    }
    return ''
}