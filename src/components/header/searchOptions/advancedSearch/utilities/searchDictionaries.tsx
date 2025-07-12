import { Size } from "../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";

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

export const minSkullSearchDictionary: SearchObject[] = [
    {
        value: 1,
        id: 0
    },
    {
        value: 2,
        id: 5
    },
    {
        value: 3,
        id: 10
    },
    {
        value: 4,
        id: 15
    },
    {
        value: 5,
        id: 20
    },
    {
        value: 6,
        id: 25
    },
    {
        value: 7,
        id: 30
    }
]

export const maxSkullSearchDictionary: SearchObject[] = [
    {
        value: 1,
        id: 3
    },
    {
        value: 2,
        id: 8
    },
    {
        value: 3,
        id: 13
    },
    {
        value: 4,
        id: 18
    },
    {
        value: 5,
        id: 23
    },
    {
        value: 6,
        id: 28
    },
    {
        value: 7,
        id: 35
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
    { id: 1, value: 'Striker' },
    { id: 2, value: 'Defender' },
    { id: 3, value: 'Fast - Talker' },
    { id: 4, value: 'Feinter' },
    { id: 5, value: 'Fodder' },
    { id: 6, value: 'Sandbagger' },
    { id: 7, value: 'Corruptor' },
    { id: 8, value: 'Gaslighter' },
    { id: 9, value: 'Enabler' },
    { id: 10, value: 'Opportunist' }
]

export const confrontationSecondaryDictionary: SearchObject[] = [
    { id: 32, value: 'Elite' },
    { id: 33, value: 'Solo' }
]

export const combatPrimaryDictionary: SearchObject[] = [
    { id: 11, value: 'Artillery' },
    { id: 12, value: 'Brute' },
    { id: 13, value: 'Captain' },
    { id: 14, value: 'Controller' },
    { id: 15, value: 'Defender' },
    { id: 16, value: 'Duelist' },
    { id: 19, value: 'Shock' },
    { id: 20, value: 'Skirmisher' }
]

export const combatSecondaryDictionary: SearchObject[] = [
    { id: 18, value: 'Fodder' },
    { id: 31, value: 'Elite' },
    { id: 21, value: 'Solo' },
]

export const skillPrimaryDictionary: SearchObject[] = [
    { id: 22, value: 'Hunter' },
    { id: 23, value: 'Prey' },
    { id: 24, value: 'Controller' },
    { id: 25, value: 'Lock' },
    { id: 27, value: 'Antagonist' },
    { id: 28, value: 'Trap' },
    { id: 29, value: 'Hazard' },
    { id: 30, value: 'Fodder' }
]

export const skillSecondaryDictionary: SearchObject[] = [
    { id: 34, value: 'Elite' },
    { id: 35, value: 'Solo' }
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