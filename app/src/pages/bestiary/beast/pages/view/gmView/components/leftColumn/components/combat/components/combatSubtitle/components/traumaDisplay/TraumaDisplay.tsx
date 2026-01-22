import Icon from '../../../../../../../../../../../../../../components/icon/Icon'
import './TraumaDisplay.css'

interface Props {
    trauma: number | boolean,
    noTrauma: boolean,
    rollUnderTrauma: number
}

export default function TraumaDisplay({ trauma, noTrauma, rollUnderTrauma }: Props) {
    const traumaString = `${trauma} (${rollUnderTrauma} - w1)`
    const showTrauma = !noTrauma && trauma

    return (
        <>
            {showTrauma &&
                <div className="trauma-pair-shell">
                    <div>
                        <p>Trauma (</p> <Icon iconName="downArrow" color='black' tooltip="The result of this Check determines the number of seconds this enemy is Trauma'd for" /><p>)</p>
                    </div>
                    <p>{traumaString}</p>
                </div>
            }
        </>
    )
}