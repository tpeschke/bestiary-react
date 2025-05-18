import { ReturnedGenericLoot } from "../../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces"

interface Props {
    loot: ReturnedGenericLoot
}

export default function GenericLootDisplay({ loot }: Props) {
    return <li>{loot}</li>
}