import './Characteristics.css'

import Pair from "../../../../../../../components/UI/pair/Pair"
import { Conflict } from "../../../../../../../interfaces/infoInterfaces.ts/socialInfo"

interface Props {
    title: string,
    characteristics: Conflict[]
}

export default function CharacteristicsInfo({ title, characteristics }: Props) {
    return (
        <div className='characteristic-info-shell'>
            <h3>{title}</h3>
            {characteristics.map(({trait, rank}: Conflict, index: number) => <Pair key={index} title={trait} info={rank} format={{title: 'none'}} />)}
        </div>
    )
}