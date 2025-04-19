import './infoDisplay.css'

import HTMLDisplay from "../../../../../../components/UI/htmlDisplay/htmlDisplay"
import Body from '../../../../../../components/UI/body/Body'

interface Props {
    section: string,
    info: string
}

export default function InfoDisplay({ section, info }: Props) {

    return (
        <div className='info-display-shell'>
            <h2>{section}</h2>
            <Body>
                <HTMLDisplay html={info} />
            </Body>
        </div>
    )
}