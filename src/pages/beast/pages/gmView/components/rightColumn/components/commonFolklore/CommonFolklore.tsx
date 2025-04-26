import './CommonFolkore.css'

import { Folklore } from '../../../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces'

import Body from '../../../../../../components/UI/body/Body'
import Icon from '../../../../../../../../components/icon/Icon'

interface Props {
    folklores: Folklore[]
}

export default function CommonFolklore({ folklores }: Props) {

    return (
        <div className='common-folklore-shell'>
            <div>
                <h2>Common Folklore</h2>
                <Icon iconName='info' margin="left" tooltip="Common folklore is what people believe about the monster and what players will know without making a Check. The first line is the belief while the second line is the truth. The belief is almost always wrong in some way but almost always has a bit of truth as well."/>
            </div>
            <Body>
                <ul>
                    {folklores.map(({ belief, truth }: Folklore) => {
                        return (
                            <li>
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
    )
}