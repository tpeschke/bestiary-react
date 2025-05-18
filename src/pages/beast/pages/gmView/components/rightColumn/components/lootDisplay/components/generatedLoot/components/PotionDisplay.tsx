import Icon from "../../../../../../../../../../../components/icon/Icon"
import { ReturnedPotion } from "../../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces"

interface Props {
    potion: ReturnedPotion
}

export default function PotionDisplay({ potion }: Props) {
    const { name, swigs, isSalve, effect, price } = potion

    return (
        <li>
            {name} w/ {swigs} {formatApplicationString(isSalve, swigs)}
            <Icon iconName="info" tooltip={formatEffectString(effect, price)} />
        </li>
    )
}

function formatApplicationString(isSalve: boolean, swigs: number): string {
    return `${isSalve ? 'application' : 'swig'}${swigs > 1 ? 's' : ''}`
}

function formatEffectString(effect: string, price: number): string {
    return `${effect}\n${price} sc`
}