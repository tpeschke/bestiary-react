import calculateConvictionRank from "./utilities/calculateConvictionRank"
import calculateDescriptionRank from "./utilities/calculateDescriptionRank"
import calculateRelationshipRank from "./utilities/calculateRelationshipRank"

export type CharacteristicWithRanks = 'Convictions' | 'Descriptions' | 'Relationships'

export function calculateRankForCharacteristic(type: CharacteristicWithRanks = 'Convictions', skullIndex: number, role: string): number {
    switch (type) {
        case 'Convictions':
            return calculateConvictionRank(skullIndex, role)
        case 'Descriptions':
            return calculateDescriptionRank(skullIndex, role)
        case 'Relationships':
            return calculateRelationshipRank(skullIndex, role)
        default:
            return 0
    }
}