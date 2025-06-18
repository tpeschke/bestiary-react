import './infoDisplay.css'

import HTMLDisplay from "../../../../../../components/UI/htmlDisplay/htmlDisplay"
import Body from '../../../../../../components/UI/body/Body'

interface Props {
    section: string,
    info: string,
}

export default function InfoDisplay({ section, info }: Props) {
    const showSection = info && info !== ''

    return (
        <>
            {showSection &&
                <>
                    <div className='info-display-shell'>
                        <h2 className='border'>{section}</h2>
                        <Body>
                            <HTMLDisplay html={info} />
                        </Body>
                    </div>
                </>
            }
        </>
    )
}