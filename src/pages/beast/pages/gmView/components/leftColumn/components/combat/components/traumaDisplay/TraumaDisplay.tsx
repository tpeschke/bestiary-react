import './TraumaDisplay.css'

import Body from "../../../../../../../../components/UI/body/Body"
import Icon from "../../../../../../../../../../components/icon/Icon"

interface Props {
    vitality: string | number,
    notrauma: boolean,
    rollundertrauma: number
}

export default function TraumaDisplay({ vitality, notrauma, rollundertrauma }: Props) {
    let traumaString: string | boolean = false
    if (typeof vitality === 'number') {
        traumaString = `${Math.floor(vitality / 2)} (${rollundertrauma})`
    }

    return (
        <>
            {!notrauma && traumaString ?
                <Body>
                    <div className="trauma-pair-shell">
                        <div>
                            <p>Trauma (</p> <Icon iconName="downArrow" color='black' tooltip='What you need to roll under for the Trauma Check' /><p>)</p>
                        </div>
                        <p>{traumaString}</p>
                    </div>
                </Body>
                : <></>
            }
        </>
    )
}