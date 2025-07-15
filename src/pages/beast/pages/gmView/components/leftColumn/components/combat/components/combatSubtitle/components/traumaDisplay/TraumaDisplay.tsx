import './TraumaDisplay.css'

import Icon from "../../../../../../../../../../../../components/icon/Icon"

interface Props {
    trauma: number | boolean,
    notrauma: boolean,
    rollundertrauma: number
}

export default function TraumaDisplay({ trauma, notrauma, rollundertrauma }: Props) {
    const traumaString = `${trauma} (${rollundertrauma})`
    const showTrauma = !notrauma && trauma

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