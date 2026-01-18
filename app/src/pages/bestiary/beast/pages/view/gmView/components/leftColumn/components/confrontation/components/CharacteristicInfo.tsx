import { Conflict } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import Body from '../../../../../../../../components/UI/body/Body'
import Pair from '../../../../../../../../components/UI/pair/Pair'
import './Characteristics.css'

interface Props {
    title: string,
    characteristics: Conflict[]
}

export default function CharacteristicsInfo({ title, characteristics }: Props) {
    return (
        <div className='characteristic-info-shell'>
            <h3>{title}</h3>
            <Body>
                <>
                    {characteristics.map(({ trait, rank }: Conflict, index: number) => <Pair key={index} title={trait} info={rank} format={{ title: 'none' }} />)}
                </>
            </Body>
        </div>
    )
}