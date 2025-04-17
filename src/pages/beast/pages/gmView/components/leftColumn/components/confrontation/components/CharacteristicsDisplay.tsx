import { ConflictObject } from "../../../../../../../interfaces/infoInterfaces.ts/socialInfo"

import CharacteristicsInfo from "./CharacteristicInfo"

interface Props {
    characteristicInfo: ConflictObject
}

export default function CharacteristicsDisplay({ characteristicInfo }: Props) {
    const { burdens,  convictions,  descriptions,  devotions, flaws } = characteristicInfo
        
    return (
        <>
            {descriptions.length > 0 ? <CharacteristicsInfo title="Descriptions" characteristics={descriptions} /> : <></>}
            {convictions.length > 0 ? <CharacteristicsInfo title="Convictions" characteristics={convictions} /> : <></>}
            {devotions.length > 0 ? <CharacteristicsInfo title="Devotions" characteristics={devotions} /> : <></>}
            {flaws.length > 0 ? <CharacteristicsInfo title="Flaws" characteristics={flaws} /> : <></>}
            {burdens.length > 0 ? <CharacteristicsInfo title="Burdens & Injuries" characteristics={burdens} /> : <></>}
        </>
    )
}
