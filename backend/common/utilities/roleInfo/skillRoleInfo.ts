import { Strength } from "../../interfaces/calculationInterfaces"

interface PrimarySkillRolesObject {
    [key: string]: RoleObject
}

interface RoleObject {
    mental: Strength,
    panic: Strength
}

export const primarySkillRoles: PrimarySkillRolesObject = {
    'Hunter': {
        mental: 'minSt',
        panic: 'majSt'
    },
    'Prey': {
        mental: 'majSt',
        panic: 'majWk'
    },
    'Controller': {
        mental: 'majSt',
        panic: 'majSt'
    },
    'Lock': {
        mental: 'minWk',
        panic: 'minWk'
    },
    'Antagonist': {
        mental: 'minWk',
        panic: 'majSt'
    },
    'Trap': {
        mental: 'minSt',
        panic: 'minSt'
    },
    'Hazard': {
        mental: 'minSt',
        panic: 'minSt'
    },
}