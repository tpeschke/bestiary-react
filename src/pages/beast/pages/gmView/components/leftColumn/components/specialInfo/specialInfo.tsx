import './specialInfo.css'

import HTMLDisplay from "../../../../../../components/UI/htmlDisplay"
import Body from '../../../../../../components/UI/body/Body'

type Section = 'Confrontation' | 'Skill' | 'Combat'
type Type = 'Attack' | 'Defense'

interface Props {
    section: Section,
    type: Type,
    info?: string
}

export default function SpecialInfo({ section, type, info }: Props) {
    return (
        <div className='special-info-shell'>
            {info ?
                <>
                    <h3>{`${section} ${type} Info`}</h3>
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