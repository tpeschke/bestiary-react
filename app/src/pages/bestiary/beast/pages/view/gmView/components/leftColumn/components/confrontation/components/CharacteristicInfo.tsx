import { Conflict } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import Body from '../../../../../../../../components/UI/body/Body'
import Pair from '../../../../../../../../components/UI/pair/Pair'
import './Characteristics.css'
import { SystemOption } from '@bestiary/common/interfaces/beast/beast'

interface Props {
    title: string,
    characteristics: Conflict[],
    type?: SystemOption,
    tooltip?: string
}

export default function CharacteristicsInfo({ title, characteristics, type = 'Bonfire', tooltip }: Props) {
    return (
        <div className='characteristic-info-shell'>
            <h3 data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>{title}</h3>
            <Body>
                <>
                    {characteristics.map(({ trait, rank }: Conflict, index: number) => <Pair key={index} title={trait} info={type === 'HackMaster' ? '' : rank} format={{ title: 'none' }} />)}
                </>
            </Body>
        </div>
    )
}