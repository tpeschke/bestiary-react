import { SystemOption } from "../../../../interfaces/beast/beast"
import calculateDescriptionRank from "./utilities/calculateDescriptionRank"
import calculateRelationshipRank from "./utilities/calculateRelationshipRank"

export type CharacteristicWithRanks = 'Descriptions' | 'Convictions' | 'Relationships'

export function calculateRankForCharacteristic(type: CharacteristicWithRanks = 'Descriptions', skullIndex: number, role: string, system: SystemOption): number {
    switch (type) {
        case 'Descriptions':
            return calculateDescriptionRank(skullIndex, system)
        case 'Relationships':
            return calculateRelationshipRank(skullIndex, role)
        default:
            return 0
    }
}