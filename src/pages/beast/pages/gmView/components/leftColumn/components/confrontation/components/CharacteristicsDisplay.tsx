import { ConflictObject } from "../../../../../../../interfaces/infoInterfaces/socialInfo"

import CharacteristicsInfo from "./CharacteristicInfo"

interface Props {
    characteristicInfo: ConflictObject,
    setHasCharacteristics: Function
}

export default function CharacteristicsDisplay({ characteristicInfo, setHasCharacteristics }: Props) {
    const { burdens,  convictions,  descriptions,  relationships, flaws } = characteristicInfo

    const hasDescriptions = descriptions.length > 0
    const hasConvictions = convictions.length > 0
    const hasRelationships = relationships.length > 0
    const hasFlaws = flaws.length > 0
    const hasBurdens = burdens.length > 0

    setHasCharacteristics(hasDescriptions && hasConvictions && hasRelationships && hasFlaws && hasBurdens)
        
    return (
        <>
            {hasDescriptions && <CharacteristicsInfo title="Descriptions" characteristics={descriptions} />}
            {hasConvictions && <CharacteristicsInfo title="Convictions" characteristics={convictions} />}
            {hasRelationships && <CharacteristicsInfo title="Relationships" characteristics={relationships} />}
            {hasFlaws && <CharacteristicsInfo title="Flaws" characteristics={flaws} />}
            {hasBurdens && <CharacteristicsInfo title="Burdens & Injuries" characteristics={burdens} />}
        </>
    )
}
