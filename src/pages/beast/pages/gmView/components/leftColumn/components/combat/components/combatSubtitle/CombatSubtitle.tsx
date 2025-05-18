import './CombatSubtitle.css'

import { Size } from "../../../../../../../../interfaces/infoInterfaces/generalInfoInterfaces"

import Body from "../../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../../components/UI/pair/Pair"
import SizeDisplay from "./components/sizeDisplay/SizeDisplay"
import TraumaDisplay from "./components/traumaDisplay/TraumaDisplay"

interface Props {
    traumaInfo: TraumaInfo,
    initiative: string,
    knockbackInfo: KnockbackInfo
}

interface TraumaInfo {
    trauma: number | boolean,
    notrauma: boolean,
    rollundertrauma: number
}

interface KnockbackInfo {
        knockback: number, 
        noknockback: boolean, 
        size: Size
}

export default function CombatSubtitle({ traumaInfo, initiative, knockbackInfo }: Props) {
    const { trauma, notrauma, rollundertrauma } = traumaInfo
    const { knockback, noknockback, size } = knockbackInfo

    return (
        <Body>
            <div className="combat-subtitle-shell">
                <TraumaDisplay trauma={trauma} notrauma={notrauma} rollundertrauma={rollundertrauma} />
                <SizeDisplay size={size} knockback={knockback} noknockback={noknockback} />
                <Pair title="Initiative" info={initiative} format={{ title: 'none', titleJustified: 'right' }} />
            </div>
        </Body>
    )
}