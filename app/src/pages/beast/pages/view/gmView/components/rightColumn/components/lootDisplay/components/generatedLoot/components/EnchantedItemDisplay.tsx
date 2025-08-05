import { enchantedItemBase } from "../../../../../../../../../../../../frontend-config"
import { ReturnedEnchantedItem } from "../../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces"

interface Props {
    enchantedItem: ReturnedEnchantedItem
}

export default function EnchantedItemDisplay({ enchantedItem }: Props) {
    const {id, name} = enchantedItem

    return (
        <li>
            <a href={enchantedItemBase + id} target="_blank">
                {name}
            </a>
        </li>
    )
}