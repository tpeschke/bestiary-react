import Icon from "../../../../../../../../../../../components/icon/Icon"
import { ReturnedScroll } from "../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces"

interface Props {
    scroll: ReturnedScroll
}

export default function ScrollDisplay({ scroll }: Props) {
    const { name, sp, tooltip } = scroll

    return (
        <li>
            {name} ({sp} SP)
            <Icon iconName="info" margin='left' tooltip={formatTooltipString(tooltip)} />
        </li>
    )
}

function formatTooltipString(breakdown: string): string {
    return `Requires Literacy in the language and takes 2 Sec / SP to read, after which, it shapes the spell. The scroll is destroyed on shape.\nRudiment Breakdown: ${breakdown}`
}