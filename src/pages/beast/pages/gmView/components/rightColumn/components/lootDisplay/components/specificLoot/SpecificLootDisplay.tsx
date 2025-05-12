import { SpecificLoot } from "../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces"

interface Props {
    specificLoots?: SpecificLoot[]
}

export default function SpecificLootDisplay({ specificLoots = [] }: Props) {
    return (
        <ul className="horizontal-list">
            {specificLoots.map((loot: SpecificLoot) => formatSpecificLoot(loot))}
        </ul>
    )
}

function formatSpecificLoot({loot, price, id}: SpecificLoot) {
    if (price) {
        loot += ` (${price})`
    }

    return <li key={id}>{loot}</li>
}