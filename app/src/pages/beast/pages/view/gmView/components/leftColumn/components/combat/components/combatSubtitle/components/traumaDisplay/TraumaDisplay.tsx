import Icon from '../../../../../../../../../../../../../components/icon/Icon'
import './TraumaDisplay.css'

interface Props {
    trauma: number | boolean,
    noTrauma: boolean,
    rollUnderTrauma: number
}

export default function TraumaDisplay({ trauma, noTrauma, rollUnderTrauma }: Props) {
    const traumaString = `${trauma} (${rollUnderTrauma})`
    const showTrauma = !noTrauma && trauma

    return (
        <>
            {showTrauma &&
                <div className="trauma-pair-shell">
                    <div>
                        <p>Trauma (</p> <Icon iconName="downArrow" color='black' tooltip='What you need to roll under for the Trauma Check' /><p>)</p>
                    </div>
                    <p>{traumaString}</p>
                </div>
            }
        </>
    )
}