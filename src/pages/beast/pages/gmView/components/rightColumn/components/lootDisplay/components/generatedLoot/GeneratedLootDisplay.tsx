import { useEffect } from "react";

import { Loot } from "../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces";

import LootHooks from "./hooks/lootHooks";

interface Props {
    lairLoot: Loot,
    carriedLoot: Loot,
    maxPoints: number
}

export default function GeneratedLootDisplay(setLoading: Function, { lairLoot: lairParams, carriedLoot: carriedParams, maxPoints }: Props) {
    const { generateLoot, lairLoot, carriedLoot } = LootHooks();

    useEffect(() => {
        generateLoot(lairParams, carriedParams, maxPoints)
    }, []);

    setLoading(lairLoot && carriedLoot)

    return (
        <>
            <h3>Carried Loot</h3>
            {/* Carried Loot */}

            <h3>Lair Loot</h3>
            {/* Lair Loot */}
        </>
    )
}