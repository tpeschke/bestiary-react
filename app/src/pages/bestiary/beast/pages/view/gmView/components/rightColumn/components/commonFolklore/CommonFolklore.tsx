import { Rarity } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import Icon from '../../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../../components/UI/body/Body'
import { Folklore } from '../../../../../../../interfaces/infoInterfaces/generalInfoInterfaces'
import Pair from '../../../../../../../components/UI/pair/Pair'
import './CommonFolklore.css'

interface Props {
    folklores: Folklore[],
    rarity: Rarity
}

export default function CommonFolklore({ folklores, rarity }: Props) {
    function formatRarityString({ rarityName, difficulty }: Rarity): string {
        let rarityString = rarityName

        if (difficulty) {
            rarityString += ` (${difficulty})`
        }

        return rarityString
    }

    return (
        <>
            {folklores.length > 0 &&
                <div className='common-folklore-shell'>
                    <div>
                        <h2>Common Folklore</h2>
                        <Icon iconName='info' margin="left" tooltip="Common folklore is what people believe about the monster and what players will know without making a Check. The first line is the belief while the second line is the truth. The belief is almost always wrong in some way but almost always has a bit of truth as well." />
                    </div>
                    <Body>
                        <Pair title='Rarity' info={formatRarityString(rarity)} />
                        <ul>
                            {folklores.map(({ belief, truth }: Folklore, index) => {
                                return (
                                    <li key={index}>
                                        {belief}
                                        <ul>
                                            <li>{truth}</li>
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </Body>
                </div>
            }
        </>
    )
}