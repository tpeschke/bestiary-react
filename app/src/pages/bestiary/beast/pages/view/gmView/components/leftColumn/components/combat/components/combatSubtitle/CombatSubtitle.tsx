import { Size } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import Body from '../../../../../../../../../components/UI/body/Body'
import Pair from '../../../../../../../../../components/UI/pair/Pair'
import './CombatSubtitle.css'

import SizeDisplay from "./components/sizeDisplay/SizeDisplay"
import TraumaDisplay from "./components/traumaDisplay/TraumaDisplay"

interface Props {
    traumaInfo: TraumaInfo,
    initiative: string,
    knockbackInfo: KnockbackInfo
}

interface TraumaInfo {
    trauma: number | boolean,
    noTrauma: boolean,
    rollUnderTrauma: number
}

interface KnockbackInfo {
    knockback: number,
    noKnockback: boolean,
    size: Size
}

export default function CombatSubtitle({ traumaInfo, initiative, knockbackInfo }: Props) {
    const { trauma, noTrauma, rollUnderTrauma } = traumaInfo
    const { knockback, noKnockback, size } = knockbackInfo

    const showSection = trauma || noTrauma || knockback || size

    return (
        <>
            {showSection &&
                <Body>
                    <div className="combat-subtitle-shell">
                        <TraumaDisplay trauma={trauma} noTrauma={noTrauma} rollUnderTrauma={rollUnderTrauma} />
                        <SizeDisplay size={size} knockback={knockback} noKnockback={noKnockback} />
                        <Pair title="Initiative" info={initiative} format={{ title: 'none', titleJustified: 'right' }} />
                    </div>
                </Body>
            }
        </>
    )
}