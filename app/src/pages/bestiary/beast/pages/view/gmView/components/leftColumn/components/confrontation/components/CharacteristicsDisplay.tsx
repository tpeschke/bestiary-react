import { ConflictObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import CharacteristicsInfo from "./CharacteristicInfo"
import Body from "../../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../../components/UI/pair/Pair"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

interface Props {
    characteristicInfo: ConflictObject,
    type: SystemOption
}

export default function CharacteristicsDisplay({ characteristicInfo, type }: Props) {
    const { socialSkillSuites, burdens, relationships, flaws } = characteristicInfo
    const { preferredEmotions, inspire, intimidate, inform, influence } = socialSkillSuites

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
                        <Pair title="Influence" info={influence + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />
                        <Pair title="Inform" info={inform + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />
                        <Pair title="Inspire" info={inspire + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />
                        <Pair title="Intimidate" info={intimidate + (type === 'HackMaster' ? '%' : '')} format={{ title: 'none' }} />
                    </div>
                </Body>
            </div>
            <div className='characteristic-info-shell'>
                <h3 data-tooltip-id="my-tooltip" data-tooltip-content={type !== 'Bonfire' ? "When inflicting the first Emotion or defending against the second Emotion, the Check is made with Advantage." : undefined}>Preferred Emotions</h3>
                <Body>
                    <div className="conviction-shell">
                        {preferredEmotions.emotions.map((emotion, index) => <Pair tooltip="Attack / Defense" key={index} title={`${emotion} / ${emotionPairsDictionary[emotion]}`} info={type === 'HackMaster' ? '' : preferredEmotions.rank} format={{ title: 'none' }} />)}
                    </div>
                </Body>
            </div>
            {hasRelationships && <CharacteristicsInfo title="Relationships" characteristics={relationships} type={type} tooltip={type !== 'Bonfire' ? "Relations represent Always / Never situations." : undefined} />}
            {hasFlaws && <CharacteristicsInfo title="Flaws" characteristics={flaws} />}
            {hasBurdens && <CharacteristicsInfo title="Burdens & Injuries" characteristics={burdens} />}
        </>
    )
}
