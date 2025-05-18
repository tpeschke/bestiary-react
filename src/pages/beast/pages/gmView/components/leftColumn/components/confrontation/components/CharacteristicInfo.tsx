import './Characteristics.css'

import Pair from "../../../../../../../components/UI/pair/Pair"

import { Conflict } from "../../../../../../../interfaces/infoInterfaces/socialInfo"
import Body from '../../../../../../../components/UI/body/Body'

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