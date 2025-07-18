import Icon from '../../../../../../../../../components/icon/Icon'
import Body from '../../../../../../../components/UI/body/Body'
import { Folklore } from '../../../../../../../interfaces/infoInterfaces/generalInfoInterfaces'
import './CommonFolkore.css'

interface Props {
    folklores: Folklore[]
}

export default function CommonFolklore({ folklores }: Props) {

    return (
        <>
            {folklores.length > 0 &&
                <div className='common-folklore-shell'>
                    <div>
                        <h2>Common Folklore</h2>
                        <Icon iconName='info' margin="left" tooltip="Common folklore is what people believe about the monster and what players will know without making a Check. The first line is the belief while the second line is the truth. The belief is almost always wrong in some way but almost always has a bit of truth as well." />
                    </div>
                    <Body>
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