import { useState } from "react";
import axios from "axios";

import { Loot, ReturnedLoot } from "../../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces";

import { lootURL } from "../../../../../../../../../../../../../frontend-config";
import alertInfo, { Message } from "../../../../../../../../../../../../../components/alert/alerts";

interface LootHooksReturn {
    carriedLoot: ReturnedLoot[] | null,
    lairLoot: ReturnedLoot[] | null,
    generateLoot: (carriedLoot: Loot | null, lairLoot: Loot | null, maxPoints: number, timesToRoll: number) => Promise<boolean>,
    timesToRoll: number,
    setTimesToRoll: Function
}

interface ReturnData {
    carriedLoot: ReturnedLoot[],
    lairLoot: ReturnedLoot[],
    type: 'data'
}

interface GenerateLootReturnData {
    data: ReturnData | Message
}

export default function LootHooks(): LootHooksReturn {
    const [carriedLoot, setCarriedLoot] = useState<ReturnedLoot[] | null>(null)
    const [lairLoot, setLairLoot] = useState<ReturnedLoot[] | null>(null)

    const [timesToRoll, setTimesToRoll] = useState(1)

    async function generateLoot(carriedLoot: Loot | null, lairLoot: Loot | null, maxPoints: number, timesToRollParam: number = 1): Promise<boolean> {
         return axios.post(lootURL, { loot: { carriedLoot, lairLoot }, maxPoints, timesToRoll: timesToRollParam }).then(({ data }: GenerateLootReturnData) => {
            if (data.type === 'message') {
                alertInfo(data)
            } else if (data.type === 'data') {
                const { carriedLoot, lairLoot } = data
                setCarriedLoot(carriedLoot)
                setLairLoot(lairLoot)
            }

            return true
        })
    }

    return {
        carriedLoot,
        lairLoot,
        generateLoot,
        timesToRoll,
        setTimesToRoll
    }
}