import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getCharacteristicsForEdit, getMonsterCharacteristics } from "../../../../../../../db/beast/conflict"
import query from "../../../../../../../db/database"
import { sortByRank, sortOutAnyToTheBottom } from "../../../../../../../utilities/sorts"
import { UnformatedConflict, formatCharacteristics } from "./formatCharacteristics"

export async function getConflict(beastId: number, isEditing: boolean,
    traitlimit: number, relationshiplimit: number, flawlimit: number, socialpoints: number): Promise<ConflictObject> {

    let conflict: ConflictObject = { descriptions: [], convictions: [], relationships: [], flaws: [], burdens: [] }

    if (isEditing) {
        const characteristics: UnformatedConflict[] = await query(getCharacteristicsForEdit, beastId)

        characteristics.forEach((characteristic: UnformatedConflict) => {
            if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                conflict.convictions.push(characteristic)
            } else if (characteristic.type === 'd') {
                conflict.relationships.push(characteristic)
            } else if (characteristic.type === 'f') {
                conflict.flaws.push(characteristic)
            } else if (characteristic.type === 'b') {
                conflict.burdens.push(characteristic)
            } else if (characteristic.type === 'h') {
                conflict.descriptions.push(characteristic)
            }
        })
        return conflict
    } else {
        const characteristics: UnformatedConflict[] = await query(getMonsterCharacteristics, beastId)

        characteristics.forEach((characteristic: UnformatedConflict) => {
            if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                if (traitlimit && conflict.convictions.length < traitlimit) {
                    conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!traitlimit) {
                    conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'd') {
                if (relationshiplimit && conflict.relationships.length < relationshiplimit) {
                    conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!relationshiplimit) {
                    conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'f') {
                if (flawlimit && conflict.flaws.length < flawlimit) {
                    conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!flawlimit) {
                    conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'b') {
                conflict.burdens.push(formatCharacteristics(socialpoints, characteristic))
            } else if (characteristic.type === 'h') {
                conflict.descriptions.push(formatCharacteristics(socialpoints, characteristic))
            }
        })

        conflict.descriptions = conflict.descriptions.sort(sortByRank)
        conflict.convictions = conflict.convictions.sort(sortByRank)
        conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
        conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

        return conflict
    }
}