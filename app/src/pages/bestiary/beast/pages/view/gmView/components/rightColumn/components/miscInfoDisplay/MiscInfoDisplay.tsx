import './MiscInfoDisplay.css'

import Body from '../../../../../../../components/UI/body/Body'
import Pair from '../../../../../../../components/UI/pair/Pair'
import ClimatesDisplay from './climates/ClimatesDisplay'
import { Climate } from '../../../../../../../interfaces/infoInterfaces/linkedInfoInterfaces'
import { Rarity } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'

interface Props {
    miscInfo: MiscInfo
}

export interface MiscInfo {
    senses: string,
    diet: string,
    rarity: Rarity,
    climates: Climate[]
}

export default function MiscInfoDisplay({ miscInfo }: Props) {
    const { senses, diet, rarity, climates } = miscInfo

    const showSenses = senses && senses !== ''
    const showDiet = diet && diet !== ''
    const showClimates = climates.length > 0

    return (
        <div className='misc-info-display-shell'>
            <h2 className='border'>Misc Info</h2>
            <Body>
                <div>
                    {showSenses && <Pair title='Senses' info={senses} />}
                    {showDiet && <Pair title='Diet' info={diet} />}
                    <Pair title='Rarity' info={formatRarityString(rarity)} />
                    {showClimates && <ClimatesDisplay climates={climates} />}
                </div>
            </Body>
        </div>
    )
}

function formatRarityString({ rarityName, difficulty}: Rarity): string {
    let rarityString = rarityName

    if (difficulty) {
        rarityString += ` (${difficulty})`
    }

    return rarityString
}