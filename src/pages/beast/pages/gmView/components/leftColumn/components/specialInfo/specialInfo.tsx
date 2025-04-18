import './specialInfo.css'

import HTMLDisplay from "../../../../../../components/UI/htmlDisplay"
import Body from '../../../../../../components/UI/body/Body'

type Type = 'Attack' | 'Defense'

interface Props {
    type: Type,
    info?: string
}

export default function SpecialInfo({ type, info }: Props) {
    return (
        <div className='special-info-shell'>
            {info ?
                <>
                    <h3>{`${type} Info`}</h3>
                    <Body>
                        <HTMLDisplay html={info} />
                    </Body>
                </>
                :
                <></>
            }
        </div>
    )
}