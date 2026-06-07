import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getCharacteristicsForEdit, getMonsterCharacteristics } from "../../../../../../../../db/beast/conflict"
import query from "../../../../../../../../db/database"
import { sortByRank, sortOutAnyToTheBottom } from "../../../../../../../../utilities/sorts"
import { UnformattedConflict, formatCharacteristics } from "./formatCharacteristics"

export async function getConflict(beastId: number, isEditing: boolean, socialSkullIndex: number, role: string): Promise<ConflictObject> {
    // TODO EDIT
    if (isEditing) {
        getCharacteristicsForEdit
    }

    return populateNonEditingCharacteristics(beastId, socialSkullIndex, role)
}

async function populateNonEditingCharacteristics(beastId: number, socialSkullIndex: number, role: string) {
    let conflict: ConflictObject = { socialSkillSuites: {
        influence: 0,
        inform: 0,
        inspire: 0,
        intimidate: 0,
        preferredEmotions: {
            emotions: [],
            rank: 0
        }
    }, descriptions: [], relationships: [], flaws: [], burdens: [] }
    
    const characteristics: UnformattedConflict[] = await query(getMonsterCharacteristics, beastId)

    characteristics.forEach((characteristic: UnformattedConflict) => {
        if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
            conflict.descriptions.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'd') {
            conflict.relationships.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'f') {
            conflict.flaws.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'b') {
            conflict.burdens.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        } else if (characteristic.type === 'h') {
            // conflict.convictions.push(formatCharacteristics(socialSkullIndex, characteristic, role))
        }
    })

    // conflict.convictions = conflict.convictions.sort(sortByRank)
    conflict.descriptions = conflict.descriptions.sort(sortByRank)
    conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
    conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

    return conflict
}