import { RawMovement, Movement } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"

export function calculateMovements(movements: RawMovement[], skullIndex: number, mainRole: string) {
    return movements.reduce((movements: Movement[], movement: RawMovement) => {
        if (movement) {
            const { id, beastid: beastId, role, type, roleid: roleId, allroles: allRoles } = movement

            const reformattedMovement: Movement = {
                id, beastId, role, type, roleId, allRoles,
                stroll: 0, walk: 0, jog: 0, run: 0, sprint: 0
            }

            const calculatedMovement: Movement | undefined = calculateMovement(reformattedMovement, skullIndex, mainRole)
            if (calculatedMovement) {
                movements.push(calculatedMovement)
            }
        }

        return movements
    }, [])
}

export default function calculateMovement(movement: Movement, skullIndex: number, mainRole: string): Movement | undefined {
    const { id, beastId, role, type, roleId, allRoles } = movement

    const roleToUse = role ? role : mainRole

    const stroll = calculateSpeed(roleToUse, skullIndex, 0)
    const walk = calculateSpeed(roleToUse, skullIndex, stroll)
    const jog = calculateSpeed(roleToUse, skullIndex, walk)
    const run = calculateSpeed(roleToUse, skullIndex, jog)
    const sprint = calculateSpeed(roleToUse, skullIndex, run)

    return {
        id, beastId, roleId, allRoles,
        stroll, walk, jog, run, sprint, role,
        type: type ?? 'Land'
    }
}

function calculateSpeed(role: string, skullIndex: number, baseSpeed: number): number {
    return getRawSpeed(role, skullIndex) + baseSpeed
}

function getRawSpeed(role: string, skullIndex: number){
    const initiativeDictionary = [2, 2, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7]
    const roleIndexModifier = getRoleIndexModifier(role)

    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return initiativeDictionary[0]
    }
    if (modifiedIndex > initiativeDictionary.length) {
        return initiativeDictionary[initiativeDictionary.length - 1]
    }
    return initiativeDictionary[modifiedIndex]
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return -2
        case 'Brute':
            return 0
        case 'Defender':
            return -4
        case 'Duelist':
            return 2
        case 'Shock':
            return 2
        case 'Skirmisher':
            return 4
        default:
            return 0
    }
}