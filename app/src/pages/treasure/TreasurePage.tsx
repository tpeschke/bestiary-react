import TopHeader from '../encounterDesign/components/TopHeader'
import HoardDisplay, { Hoard } from './components/HoardDisplay'
import './TreasurePage.css'

export default function TreasurePage() {
    window.scrollTo(0, 0)
    
    const hoards: Hoard[] = [
        {
            hoardType: 'Coins',
            baseline: ['d100 cc', 'd100 cc d20 sc', 'd100 sc', 'd100 sc 20 gc', 'd100 pc'],
            extraTreasure: [
                ['d20 cc', 'd100 cc'],
                ['d20 sc', 'd100 sc'],
                ['d20 gc', 'd100 gc'],
                ['d20 pc', 'd100 pc'],
                ['d100 * 2 pc', 'd100 * 8 pc', 'd100 * 32 pc']
            ],
            notes: 'This is the total value of the horde, not their denominations'
        },
        {
            hoardType: 'Gear',
            baseline: ['1 piece of gear (Common, No)', '2 pieces of gear (Common, Low)', '3 pieces of gear (Uncommon, No)', '4 pieces of gear (Rich, High)', '5 pieces of gear (Mythic, High)'],
            applicableTables: ['Adventuring Gear', 'Armor', 'Fabrics & Ropes', 'Illumination', 'Personal Containers', 'Shields', 'Weapons'],
            extraTreasure: [
                ["1 piece of gear (Common, No)", "1d4 pieces of gear (Common, No)"],
                ["1d4 pieces of gear (Common, Low)", "1d6 pieces of gear (Common, Low)"],
                ["1 Minor Enchanted Item, 1d6 pieces of gear (Uncommon, No)", "1d4 Minor Enchanted Item, 1d8 pieces of gear (Uncommon, No)"],
                ["1 Major Enchanted Item, 1d8 pieces of gear (Rich, High)", "1 Major Enchanted Item, 1 Minor Enchanted Item, 1d10 pieces of gear (Rich, High)"],
                ["1d4 Major Enchanted Items, 1 Minor Enchanted Item, 1 piece of gear (Mythic, High)", "1d6 Major Enchanted Items, 1d4 Minor Enchanted Items, 1d4 pieces of gear (Mythic, High)", "1d8 Major Enchanted Items, 1d4 + 2 Minor Enchanted Items, 1d6 pieces of gear (Mythic, High)"]
            ]
        },
        {
            hoardType: 'Gems',
            baseline: ['1 gem worth d100 cc, A piece of jewelry (Common, No)', '2 gems worth d20 sc total, 1d4 pieces of jewelry (Common, Low)', '3 gems worth d20 gc total, 1d6 pieces of jewelry (Uncommon, No)', '4 gems worth d20 pc total, 1d8 pieces of jewelry (Rich, High)', '5 gems worth d100 pc total, 1d10 pieces of jewelry (Mythic, High)'],
            applicableTables: ['Jewelry'],
            extraTreasure: [
                ["A piece of jewelry (Common, No)", "1 gem worth d20 cc total, a piece of jewelry (Common, No)"],
                ["1d4 gems worth d100 cc total, 1d4 pieces of jewelry (Common, Low)", "1d6 gems worth d20 sc total, 1d4 pieces of jewelry (Common, Low)"],
                ["1d6 gems worth d100 cc total, 1d6 pieces of jewelry (Uncommon, No)", "1d8 gems worth d20 gc total, 1d6 pieces of jewelry (Uncommon, No)"],
                ["1d10 gems worth d100 gc total, 1d8 pieces of jewelry (Rich, High)", "1d20 gems worth d20 pc total, 1d8 pieces of jewelry (Rich, High)"],
                ["1d100 gems worth d100 pc total, 1 piece of jewelry (Mythic, High)", "1d100 gems worth d100 * 2 pc total, 1d4 pieces of jewelry (Mythic, High)", "1d100 gems worth d100 * 4 pc total, 1d6 pieces of jewelry (Mythic, High)"]
            ]
        },
        {
            hoardType: 'Goods',
            baseline: ['2 goods (Common, No)', '3 goods (Common, Low)', '4 goods (Uncommon, No)', '5 goods (Rich, High)', '6 goods (Mythic, High)'],
            applicableTables: ['Beverages', 'Clothing', 'Entertainment', 'Food', 'Household Items', 'Music Instruments', 'Trade Tools', 'Works of Art'],
            extraTreasure: [
                ["1d4 good (Common, No)", "1d6 good (Common, No)"],
                ["1d6 goods (Common, Low)", "1d10 goods (Common, Low)"],
                ["1d8 goods (Uncommon, No)", "1d12 goods (Uncommon, No)"],
                ["1d10 goods (Rich, High)", "1d20 goods (Rich, High)"],
                ["1d12 goods (Mythic, High)", "1d20 goods (Mythic, High)", "1d20 + 20 goods (Mythic, High)"]
            ]
        },
        {
            hoardType: 'Weird',
            baseline: ['1 consumable', '2 consumables', '3 consumables, 1 good (Uncommon, No)', '4 consumable, 2 goods (Rich, High)', '5 consumable, 3 goods (Mythic, High)'],
            applicableTables: ['Academic Tools', 'Alchemical Substances', 'Medical Tools', 'Raw Goods', 'Religious Items'],
            consumables: ['Pleroma', 'Talismans', 'Potions', 'Scrolls', 'Salves'],
            extraTreasure: [
                ["1 good (Common, No)", "1d4 consumables, 1 good (Common, No)"],
                ["1d4 consumables, 1d4 goods (Common, Low)", "1d6 consumables, 1d4 goods (Common, Low)"],
                ["1d6 consumables, 1d6 goods (Uncommon, No)", "1d8 consumables, 1d6 goods (Uncommon, No)"],
                ["1d8 consumables, d8 goods (Rich, High)", "1d10 consumables, d8 goods (Rich, High)"],
                ["1d10 consumables, d10 goods (Mythic, High)", "1d12 consumables, d12 (Mythic, High)", "1d20 consumables, d20 (Mythic, High)"]
            ]
        }
    ]


    return (
        <div className='treasure-page'>
            <div className='card-background'>
                <TopHeader name='Treasure' />
                <h2 className='border'>Explanation</h2>
                <p>Groups will have a baseline treasure (noted in the "Treasure" column under the <em>Strategies & Limits</em> section of their entry.</p>
                <p>This treasure corresponds to one or more types of Treasure Hordes, provided below.</p>
                <br />
                <p>When the players discover the treasure, they get in the "Baseline Treasure" section, according to the Treasure Hoard's level.</p>
                <p>They also get a roll on the "Extra Treasure" table, with a die based on the Treasure Hoard's level and modified as noted under the group's "Treasure" column.</p>
                <br />
                <p><em>So, if a group has "Poor Gear + 1", they're going to get 2 pieces of gear (Common, Low) and then roll d4 + 2 (d4 + 1 base and then another + 1 because the hoard came with a modifier) for additional gear.</em></p>
                <br />
                <p>For items (goods and gear), you'll see a parenthesis with two words inside. The first word is the rarity of the material and second word is the amount of details. So, (Uncommon, Low) means the gear is made of uncommon materials with a low level of detail.</p>
            </div>

            <div className='hoard-cards-shell'>
                {hoards.map((hoard, index) => <HoardDisplay key={index} hoard={hoard} />)}
            </div>
        </div>
    )
}