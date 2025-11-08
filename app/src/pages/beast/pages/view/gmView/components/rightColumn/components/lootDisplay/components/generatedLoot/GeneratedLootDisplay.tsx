import './GeneratedLoot.css'

import { useEffect } from "react";

import { Loot, ReturnedLoot } from "../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces";

import LootHooks from "./hooks/lootHooks";
import Body from "../../../../../../../../../components/UI/body/Body";
import AlmScriptDisplay from './components/AlmScriptDisplay';
import EnchantedItemDisplay from './components/EnchantedItemDisplay';
import PotionDisplay from './components/PotionDisplay';
import TalismanDisplay from './components/TalismanDisplay';
import ScrollDisplay from './components/ScrollDisplay';
import GenericLootDisplay from './components/GenericLootDisplay';
import Icon from '../../../../../../../../../../../components/icon/Icon';
import { SetLoadingFunction } from '../../../../../../../../../../../components/loading/Loading';

interface Props {
    lairLoot: Loot,
    carriedLoot: Loot,
    maxPoints: number,
    setLoading?: SetLoadingFunction
}

export default function GeneratedLootDisplay({ lairLoot: lairParams, carriedLoot: carriedParams, maxPoints, setLoading }: Props) {
    const { generateLoot, lairLoot, carriedLoot, setTimesToRoll, timesToRoll } = LootHooks();

    useEffect(() => {
        generateLoot(lairParams, carriedParams, maxPoints, timesToRoll)
    }, []);

    useEffect(() => {
        if (setLoading) {
            setLoading(!!lairLoot && !!carriedLoot)
        }
    }, [setLoading, lairLoot, carriedLoot])
    

    async function regenerateLoot() {
        await generateLoot(lairParams, carriedParams, maxPoints, timesToRoll)
    }

    function setNumberOfMonsters( event: any ) {
        const { value } = event.target
        if (+value !== timesToRoll) {
            setTimesToRoll(+value)
            generateLoot(lairParams, carriedParams, maxPoints, +value)
        }
    }

    return (
        <div className="generated-loot-shell">
            <h3>Lair Loot</h3>
            {lairLoot && formatLootDisplay(lairLoot, 'lair')}

            <h3>Carried Loot</h3>
            <p className='warning'>This is only for non-standard versions of the entry (Unique / Greater / Dread / THE)</p>
            {carriedLoot && formatLootDisplay(carriedLoot, 'carried')}

            <div className='input-shell'>
                <p>Number of Enemies: </p>
                <input onBlur={event => setNumberOfMonsters(event)} placeholder='1' type="number" min={0} max={25} />
                <button onClick={regenerateLoot}><Icon iconName='redo' /></button>
            </div>
        </div>
    )
}

function formatLootDisplay(lootArray: ReturnedLoot[], type: string) {
    if (lootArray.length > 0) {
        return (
            <Body>
                <ul className="horizontal-list">
                    {lootArray.map((loot: ReturnedLoot, index: number) => formatIndividualItem(loot, index))}
                </ul>
            </Body>
        )
    }
    return (
        <Body>
            <p>This entry has no {type} loot</p>
        </Body>
    )
}

function formatIndividualItem(loot: ReturnedLoot, key: number) {
    switch (loot.type) {
        case 'alms':
            return <AlmScriptDisplay key={key} script={loot.script} />
        case 'enchanted':
            return <EnchantedItemDisplay key={key} enchantedItem={loot} />
        case 'potion':
            return <PotionDisplay key={key} potion={loot} />
        case 'talisman':
            return <TalismanDisplay key={key} talisman={loot} />
        case 'scroll':
            return <ScrollDisplay key={key} scroll={loot} />
        case 'generic':
            return <GenericLootDisplay key={key} info={loot.info} />
        default:
            return <p key={key}>Something went wrong</p>
    }

}