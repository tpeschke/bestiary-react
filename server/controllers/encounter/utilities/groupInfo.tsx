import { GroupInfo, RoleNumbers } from "../../../interfaces/encounterInterfaces"

import { grabRandomElementFromArrayWithIndex } from "../../../utilities/array"
import rollDice from "../../../utilities/diceRoller"

interface ReturnedGroup {
    id: number,
    label: string
}

interface ReturnGroupInfo {
    role: string,
    weight: number
}

export default async function getGroupInfo(dataBaseConnection: any, beastId: number, numbers: string): Promise<GroupInfo> {
    const [groupLabel]: ReturnedGroup[] = await dataBaseConnection.encounter.group.getWeighted(beastId)
    const totalNumber = getTotalNumber(numbers)

    if (groupLabel) {
        const { label, id: groupId } = groupLabel
        const groupInfo: ReturnGroupInfo[] = await dataBaseConnection.encounter.group.getById(beastId, groupId)
        if (groupInfo) {
            return {
                roleNumbers: getGroupSpecifics(totalNumber, groupInfo),
                totalNumber, label
            }
        }
        return {
            roleNumbers: getGroupSpecifics(totalNumber, [{ role: 'None', weight: 1 }]),
            totalNumber, label
        }
    } else {
        return {
            roleNumbers: getGroupSpecifics(totalNumber, [{ role: 'None', weight: 1 }]),
            label: 'Group',
            totalNumber
        }
    }
}

function getTotalNumber(numbers: string) {
    const totalNumber = rollDice(numbers)
    if (totalNumber <= 0) {
        return 1
    }
    return totalNumber
}

interface RandomArrayReturn {
    index: number,
    array: ReturnGroupInfo
}

function getGroupSpecifics(totalNumber: number, weights: ReturnGroupInfo[]): RoleNumbers {
    let roleNumbers: RoleNumbers = {}
    const totalNumberArray = [...Array(totalNumber).keys()]

    let viableGroups: ReturnGroupInfo[] = weights.map(group => group)

    totalNumberArray.forEach(_ => {
        if (viableGroups.length === 0) {
            viableGroups = weights.map(group => group)
        }

        const { index, array }: RandomArrayReturn = grabRandomElementFromArrayWithIndex(viableGroups)
        const { weight, role } = array

        const roleNumber = roleNumbers[role]

        if (roleNumber) {
            roleNumbers[role]++
            if (roleNumbers[role] === weight) {
                viableGroups.splice(index, 1)
            }
        } else if (!roleNumber) {
            roleNumbers[role] = 1
            if (roleNumbers[role] === weight) {
                viableGroups.splice(index, 1)
            }
        }
    })

    return roleNumbers
}