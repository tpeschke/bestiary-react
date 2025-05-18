import { ConflictObject } from "../../../../../../../interfaces/infoInterfaces/socialInfo"

import CharacteristicsInfo from "./CharacteristicInfo"

interface Props {
    characteristicInfo: ConflictObject
}

export default function CharacteristicsDisplay({ characteristicInfo }: Props) {
    const { burdens,  convictions,  descriptions,  relationships, flaws } = characteristicInfo
        
    return (
        <>
            {descriptions.length > 0 && <CharacteristicsInfo title="Descriptions" characteristics={descriptions} />}
            {convictions.length > 0 && <CharacteristicsInfo title="Convictions" characteristics={convictions} />}
            {relationships.length > 0 && <CharacteristicsInfo title="Relationships" characteristics={relationships} />}
            {flaws.length > 0 && <CharacteristicsInfo title="Flaws" characteristics={flaws} />}
            {burdens.length > 0 && <CharacteristicsInfo title="Burdens & Injuries" characteristics={burdens} />}
        </>
    )
}
