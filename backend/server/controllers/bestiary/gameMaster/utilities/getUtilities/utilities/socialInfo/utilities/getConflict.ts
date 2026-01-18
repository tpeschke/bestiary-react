import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getCharacteristicsForEdit, getMonsterCharacteristics } from "../../../../../../../../db/beast/conflict"
import query from "../../../../../../../../db/database"
import { sortByRank, sortOutAnyToTheBottom } from "../../../../../../../../utilities/sorts"
import { UnformatedConflict, formatCharacteristics } from "./formatCharacteristics"

export async function getConflict(beastId: number, isEditing: boolean, socialSkullIndex: number, role: string): Promise<ConflictObject> {
    // TODO EDIT
    if (isEditing) {
        getCharacteristicsForEdit
    }

    return populateNonEditingCharacteristics(beastId, socialSkullIndex, role)
}

async function populateNonEditingCharacteristics(beastId: number, socialSkullIndex: number, role: string) {
    let conflict: ConflictObject = { descriptions: [], convictions: [], relationships: [], flaws: [], burdens: [] }
    
    const characteristics: UnformatedConflict[] = await query(getMonsterCharacteristics, beastId)

    characteristics.forEach((characteristic: UnformatedConflict) => {
        if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
            conflict.convictions.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'd') {
            conflict.relationships.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'f') {
            conflict.flaws.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'b') {
            conflict.burdens.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'h') {
            conflict.descriptions.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        }
    })

    conflict.descriptions = conflict.descriptions.sort(sortByRank)
    conflict.convictions = conflict.convictions.sort(sortByRank)
    conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
    conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

    return conflict
}