import { Strength } from "../../interfaces/calculationInterfaces"

interface PrimarySkillRolesObject {
    [key: string]: RoleObject
}

interface RoleObject {
    mental: Strength,
    panic: Strength
}

export const primarySkillRoles: PrimarySkillRolesObject = {
    'Generalist': {
        mental: 'minSt',
        panic: 'majSt'
    },
    'Athlete': {
        mental: 'majSt',
        panic: 'majWk'
    },
    'Loremaster': {
        mental: 'majSt',
        panic: 'majSt'
    },
    'Lock': {
        mental: 'minWk',
        panic: 'minWk'
    },
    'Strategist': {
        mental: 'minWk',
        panic: 'majSt'
    },
    'Street-Rat': {
        mental: 'minSt',
        panic: 'minSt'
    },
    'Survivalist': {
        mental: 'minSt',
        panic: 'minSt'
    },
}