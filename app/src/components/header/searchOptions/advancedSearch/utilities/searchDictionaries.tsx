import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";

export const sizeSearchDictionary: Size[] = [
    'Fine',
    'Diminutive',
    'Tiny',
    'Small',
    'Medium',
    'Large',
    'Huge',
    'Giant',
    'Enormous',
    'Colossal'
]

export interface SearchObject {
    value: string | number,
    id: number
}

export const raritySearchDictionary: SearchObject[] = [
    {
        value: 'Legendary',
        id: 1
    },
    {
        value: 'Rare',
        id: 3
    },
    {
        value: 'Uncommon',
        id: 5
    },
    {
        value: 'Common',
        id: 10
    }
]

export const accessSearchDictionary: SearchObject[] = [
    {
        value: 'Basic',
        id: 0
    },
    {
        value: 'Deluxe',
        id: 3
    },
    {
        value: 'Early Access',
        id: 20
    }
]

export const skullSearchDictionary: SearchObject[] = [
    {
        value: 0,
        id: 0
    },
    {
        value: 1,
        id: 1
    },
    {
        value: 2,
        id: 2
    },
    {
        value: 3,
        id: 3
    },
    {
        value: 4,
        id: 4
    },
    {
        value: 5,
        id: 5
    },
    {
        value: 6,
        id: 6
    },
    {
        value: 7,
        id: 7
    }
]

export const epSearchDictionary: SearchObject[] = [
    {
        value: 10,
        id: 10
    },
    {
        value: 35,
        id: 35
    },
    {
        value: 70,
        id: 70
    },
    {
        value: 140,
        id: 140
    },
    {
        value: 280,
        id: 280
    },
    {
        value: 560,
        id: 560
    },
    {
        value: 765,
        id: 765
    },
    {
        value: 890,
        id: 890
    },
    {
        value: 1015,
        id: 1015
    },
    {
        value: 1145,
        id: 1145
    },
    {
        value: 1270,
        id: 1270
    },
    {
        value: 1400,
        id: 1400
    },
    {
        value: 1525,
        id: 1525
    },
    {
        value: 1650,
        id: 1650
    },
    {
        value: 1780,
        id: 1780
    },
    {
        value: 1905,
        id: 1905
    },
    {
        value: 2035,
        id: 2035
    },
    {
        value: 2160,
        id: 2160
    },
    {
        value: 2285,
        id: 2285
    },
    {
        value: 2415,
        id: 2415
    },
    {
        value: 2540,
        id: 2540
    },
    {
        value: 2665,
        id: 2665
    },
    {
        value: 2795,
        id: 2795
    },
    {
        value: 2920,
        id: 2920
    },
    {
        value: 3050,
        id: 3050
    },
    {
        value: 3175,
        id: 3175
    },
    {
        value: 3300,
        id: 3300
    },
    {
        value: 3430,
        id: 3430
    },
    {
        value: 3555,
        id: 3555
    }
]

export const climateSearchDictionary = [
    { id: 1, code: 'Af', climate: 'Tropical Rain Forest', examples: 'Indonesia, Colombia, North DRC' },
    { id: 2, code: 'Am', climate: 'Tropical Monsoon', examples: 'Northern Brazil, Thailand Coast, Congo' },
    { id: 3, code: 'Aw/As', climate: 'Tropical Savanna', examples: 'Ivory Coast, Central India, Southern Brazil' },
    { id: 4, code: 'BWh', climate: 'Hot Desert', examples: 'The Sahara' },
    { id: 5, code: 'BWk', climate: 'Cold Desert', examples: 'Atacama Desert, Katpana Desert' },
    { id: 6, code: 'BSh', climate: 'Hot Semi-Arid', examples: 'The Outback' },
    { id: 7, code: 'BSk', climate: 'Cold Semi-Arid', examples: 'Spain, Western US' },
    { id: 8, code: 'Csa', climate: 'Hot-Summer Mediterranean', examples: 'Anatolia, Iran' },
    { id: 9, code: 'Csb', climate: 'Warm-Summer Mediterranean', examples: 'NW Iberian Peninsula, Coastal California' },
    { id: 10, code: 'Csc', climate: 'Cold-Summer Mediterranean', examples: 'Cascadia, Sierra Nevada' },
    { id: 11, code: 'Cwa', climate: 'Monsoon Humid Subtropical', examples: 'Southern US, Southern China' },
    { id: 12, code: 'Cwb', climate: 'Subtropical Highland', examples: 'Guatemala, Lesotho' },
    { id: 13, code: 'Cfb', climate: 'Temperate Oceanic', examples: 'New Zealand, Lyon' },
    { id: 14, code: 'Dsa', climate: 'Mediterranean Hot-Summer Humid', examples: 'Iran, Kyrgyzstan, Utah' },
    { id: 15, code: 'Dsb', climate: 'Warm-Summer Continental', examples: 'Iran, Armenia, South Finland, Ukraine' },
    { id: 16, code: 'Dsc', climate: 'Mediterranean Subartic', examples: 'Iceland, Chile, Norway, Washington' },
    { id: 17, code: 'Dsd', climate: 'Mediterranean Freezing Subartic', examples: 'Russia' },
    { id: 18, code: 'Dwa', climate: 'Monsoon Hot-Summer Humid', examples: 'South Korea, China, Nebraska' },
    { id: 19, code: 'Dwb', climate: 'Monsoon Warm-Summer Humid', examples: 'Mongolia, Calgary, Irkutsk' },
    { id: 20, code: 'Dwc', climate: 'Monsoon Subartic', examples: 'Russia, Alaska' },
    { id: 21, code: 'Dwd', climate: 'Monsoon Freezing Subartic', examples: 'Russia' },
    { id: 22, code: 'Dfa', climate: 'Hot-Summer Humid Continental', examples: 'Kazakhstan, Chicago, Ontario' },
    { id: 23, code: 'Dfb', climate: 'Warm-Summer Humid Continental', examples: 'Chamonix, Alberta, Quebec' },
    { id: 24, code: 'Dfc', climate: 'Subartic', examples: 'Norway, Russia, Alaska, Greenland' },
    { id: 25, code: 'Dfd', climate: 'Freezing Subartic', examples: 'Sakha Republic' },
    { id: 26, code: 'ET', climate: 'Tundra', examples: 'Crozet Islands, Denmark, Iceland' },
    { id: 27, code: 'EF', climate: 'Ice Cap', examples: 'Antarctica, Greenland' },
    { id: 28, code: null, climate: 'Salt-Water Sea', examples: 'Caspian, Black Sea' },
    { id: 29, code: null, climate: 'Salt-Water Ocean', examples: 'Atlantic, Pacific' },
    { id: 30, code: null, climate: 'Salt-Water Lake', examples: 'Salt Lake, Chott el Djerid' },
    { id: 31, code: null, climate: 'Salt-Water River', examples: 'Pecos River' },
    { id: 32, code: null, climate: 'Fresh-Water Sea', examples: 'Sea of Galilee' },
    { id: 33, code: null, climate: 'Fresh-Water Lake', examples: 'Lake Superior, Lake Victoria' },
    { id: 34, code: null, climate: 'Fresh-Water River', examples: 'The Nile, The Amazon' },
    { id: 35, code: null, climate: 'Fresh-Water Glacier', examples: 'Bering Glacier, Jostedalsbreen' },
    { id: 36, code: null, climate: 'Urban', examples: 'London, Aachen, Milan' },
    { id: 37, code: null, climate: 'Urban Sewer', examples: 'Cloaca Maxima, the Sewers of Paris' },
    { id: 38, code: null, climate: 'Ship', examples: 'Flor de la Mar, Mary Rose, Sao Gabriel' },
    { id: 39, code: null, climate: 'Dungeon', examples: 'The Xanthic Hold, Conjuror\'s Tower' },
    { id: 40, code: null, climate: 'Castle', examples: 'Neuschwanstein, Caernarfon, Bodiam' },
    { id: 41, code: null, climate: 'Ruin', examples: 'Anything the Romans built' }
]

export const confrontationPrimaryDictionary: SearchObject[] = [
    { id: 1, value: 'Advocate' },
    { id: 2, value: 'Bully' },
    { id: 3, value: 'Charmer' },
    { id: 4, value: 'Demagogue' },
    { id: 5, value: 'Enabler' },
    { id: 6, value: 'Instructor' },
    { id: 7, value: 'Obdurate' },
    { id: 8, value: 'Zealot' },
    { id: 9, value: 'No Personality' },
]

export const confrontationSecondaryDictionary: SearchObject[] = [
    { id: 10, value: 'Lesser' },
    { id: 11, value: 'Veteran' },
    { id: 12, value: 'Champion' },
    { id: 13, value: 'Officer' },
    { id: 14, value: 'Tyrant' },
    { id: 15, value: 'Solo' }
]

export const combatPrimaryDictionary: SearchObject[] = [
    { id: 1, value: 'Artillery' },
    { id: 2, value: 'Brute' },
    { id: 3, value: 'Defender' },
    { id: 4, value: 'Duelist' },
    { id: 5, value: 'Shock' },
    { id: 6, value: 'Skirmisher' }
]

export const combatSecondaryDictionary: SearchObject[] = [
    { id: 7, value: 'Lesser' },
    { id: 8, value: 'Veteran' },
    { id: 9, value: 'Champion' },
    { id: 10, value: 'Officer' },
    { id: 11, value: 'Tyrant' },
    { id: 12, value: 'Solo' },
]

export const skillPrimaryDictionary: SearchObject[] = [
    { id: 1, value: 'Generalist' },
    { id: 2, value: 'Lock' },
    { id: 3, value: 'Athlete' },
    { id: 4, value: 'Loremaster' },
    { id: 5, value: 'Strategist' },
    { id: 6, value: 'Street-Rat' },
    { id: 7, value: 'Survivalist' },
    { id: 8, value: 'Trader' },
    { id: 9, value: 'Weirdling' },
]

export const skillSecondaryDictionary: SearchObject[] = [
    { id: 10, value: 'Lesser' },
    { id: 11, value: 'Veteran' },
    { id: 12, value: 'Champion' },
    { id: 13, value: 'Officer' },
    { id: 14, value: 'Tyrant' },
    { id: 15, value: 'Solo' }
]

export const typeSearchDictionary: SearchObject[] = [
    { id: 12, value: 'Aos Sidhe' },
    { id: 1, value: 'Demon' },
    { id: 14, value: 'Eldritch' },
    { id: 4, value: 'Elemental' },
    { id: 11, value: 'Flora' },
    { id: 51, value: 'Giant' },
    { id: 9, value: 'Goblinoid' },
    { id: 7, value: 'Humanoid' },
    { id: 8, value: 'Intelligent Evil' },
    { id: 16, value: 'Insectoid' },
    { id: 5, value: 'Bestial' },
    { id: 18, value: 'Ooze' },
    { id: 13, value: 'Spirit' },
    { id: 10, value: 'Swarm' },
    { id: 17, value: 'Symbiote' },
    { id: 2, value: 'Undead, Corporeal' },
    { id: 3, value: 'Undead, Incorporeal' },
    { id: 6, value: 'Weird Creature' },
    { id: 15, value: 'Template' }
]