import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import CharacteristicsInfo from "./CharacteristicInfo"
import Body from "../../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../../components/UI/pair/Pair"

interface Props {
    characteristicInfo: ConflictObject,
}

export default function CharacteristicsDisplay({ characteristicInfo }: Props) {
    const { socialSkillSuites, burdens, relationships, flaws } = characteristicInfo
    const { preferredEmotions, empathize, intimidate, lecture, tempt } = socialSkillSuites

    const hasRelationships = relationships.length > 0
    const hasFlaws = flaws.length > 0
    const hasBurdens = burdens.length > 0

    const emotionPairsDictionary: { [key: string]: string } = {
        Joy: "Disgust",
        Anger: "Fear",
        Fear: "Anger",
        Disgust: "Depression",
        Depression: "Anger",
        Surprise: "Joy"
    }

    return (
        <>
            <div className='characteristic-info-shell'>
                <h3>Social Skill Suites</h3>
                <Body>
                    <div className="conviction-shell">
                        <Pair title="Empathize" info={empathize} format={{ title: 'none' }} />
                        <Pair title="Intimidate" info={intimidate} format={{ title: 'none' }} />
                        <Pair title="Lecture" info={lecture} format={{ title: 'none' }} />
                        <Pair title="Tempt" info={tempt} format={{ title: 'none' }} />
                    </div>
                </Body>
            </div>
            <div className='characteristic-info-shell'>
                <h3>Preferred Emotions</h3>
                <Body>
                    <div className="conviction-shell">
                        {preferredEmotions.emotions.map((emotion, index) => <Pair tooltip="Attack / Defense" key={index} title={`${emotion} / ${emotionPairsDictionary[emotion]}`} info={preferredEmotions.rank} format={{ title: 'none' }} />)}
                    </div>
                </Body>
            </div>
            {hasRelationships && <CharacteristicsInfo title="Relationships" characteristics={relationships} />}
            {hasFlaws && <CharacteristicsInfo title="Flaws" characteristics={flaws} />}
            {hasBurdens && <CharacteristicsInfo title="Burdens & Injuries" characteristics={burdens} />}
        </>
    )
}
