import { useState } from "react";
import axios from "axios";

import { Loot, ReturnedLoot } from "../../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces";

import { beastURL } from "../../../../../../../../../../../frontend-config";

interface LootHooksReturn {
    carriedLoot: ReturnedLoot[] | null,
    lairLoot: ReturnedLoot[] | null,
    generateLoot: (carriedLoot: Loot | null, lairLoot: Loot | null, maxPoints: number) => Promise<boolean>
}

interface GenerateLootReturnData {
    data: {
        carriedLoot: ReturnedLoot[], 
        lairLoot: ReturnedLoot[]
    }
}

export default function LootHooks(): LootHooksReturn {
    const [carriedLoot, setCarriedLoot] = useState<ReturnedLoot[] | null>(null)
    const [lairLoot, setLairLoot] = useState<ReturnedLoot[] | null>(null)

    async function generateLoot(carriedLoot: Loot | null, lairLoot: Loot | null, maxPoints: number): Promise<boolean> {
        return axios.post(beastURL + '/loot', {loot: {carriedLoot, lairLoot}, maxPoints}).then(({data}: GenerateLootReturnData) => {
            const { carriedLoot, lairLoot } = data
            setCarriedLoot(carriedLoot)
            setLairLoot(lairLoot)
            return true
        })
    }

    return {
        carriedLoot,
        lairLoot,
        generateLoot
    }
}