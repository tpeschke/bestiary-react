import './GeneratedLoot.css'

import { useEffect } from "react";

import { Loot, ReturnedLoot } from "../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces";

import LootHooks from "./hooks/lootHooks";
import Body from "../../../../../../../../components/UI/body/Body";
import AlmScriptDisplay from './components/AlmScriptDisplay';
import EnchantedItemDisplay from './components/EnchantedItemDisplay';
import PotionDisplay from './components/PotionDisplay';
import TalismanDisplay from './components/TalismanDisplay';
import ScrollDisplay from './components/ScrollDisplay';
import GenericLootDisplay from './components/GenericLootDisplay';
import Icon from '../../../../../../../../../../components/icon/Icon';

interface Props {
    lairLoot: Loot,
    carriedLoot: Loot,
    maxPoints: number
}

export default function GeneratedLootDisplay(setLoading: Function, { lairLoot: lairParams, carriedLoot: carriedParams, maxPoints }: Props) {
    const { generateLoot, lairLoot, carriedLoot, setTimesToRoll, timesToRoll } = LootHooks();

    setLoading(lairLoot && carriedLoot)

    useEffect(() => {
        generateLoot(lairParams, carriedParams, maxPoints, timesToRoll)
    }, []);
    

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
            <h3>Carried Loot</h3>
            {carriedLoot && formatLootDisplay(carriedLoot, 'carried')}

            <h3>Lair Loot</h3>
            {lairLoot && formatLootDisplay(lairLoot, 'lair')}

            <div className='input-shell'>
                <p>Number of Enemies: </p>
                <input onBlur={event => setNumberOfMonsters(event)} placeholder='1' type="number" min={0} max={25} />
                <button className='orange' onClick={regenerateLoot}><Icon iconName='redo' color='white' /></button>
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