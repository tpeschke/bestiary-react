import { SystemOption } from '@bestiary/common/interfaces/beast/beast'
import Icon from '../../../../../../../../../../../../../../components/icon/Icon'
import './TraumaDisplay.css'

interface Props {
    trauma: number | boolean,
    noTrauma: boolean,
    rollUnderTrauma: number,
    type: SystemOption
}

export default function TraumaDisplay({ type, trauma, noTrauma, rollUnderTrauma }: Props) {
    const traumaString = type === 'Bonfire' ? `${trauma} (${rollUnderTrauma} - w1)` : `${trauma} (${rollUnderTrauma})`
    const showTrauma = !noTrauma && trauma

    const tooltip = type === 'Bonfire' ? "The result of this Check determines the number of seconds this enemy is Trauma'd for" : "This number represents what you have to roll under on the d20."

    return (
        <>
            {showTrauma &&
                <div className="trauma-pair-shell">
                    <div>
                        <p>Trauma (</p> <Icon iconName="downArrow" color='black' tooltip={tooltip} /><p>)</p>
                    </div>
                    <p>{traumaString}</p>
                </div>
            }
        </>
    )
}