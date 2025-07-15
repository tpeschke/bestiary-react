import { LocationVitality } from "../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Folklore, Scenario } from "../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { ArtistObject, ArtistInfo } from "../../../../common/interfaces/beast/infoInterfaces/ImageInfoInterfaces";
import { BeastType, ClimateObject, Climate, LocationObject, Location, Variant } from "../../../../common/interfaces/beast/infoInterfaces/linkedInfoInterfaces";
import { Pleroma } from "../../../../common/interfaces/beast/infoInterfaces/lootInfoInterfaces";
import { Spell, Casting } from "../../../../common/interfaces/beast/infoInterfaces/castingInfo";
import { User } from "../../../interfaces/apiInterfaces";
import { Alm, Item, Loot, Scroll, SpecificLoot } from "../../../interfaces/lootInterfaces";
import rollDice from '../../../utilities/diceRoller'

import { isOwner } from "../../../utilities/ownerAccess";
import { sendErrorForwardNoFile } from "../../../utilities/sendingFunctions";
import { objectifyItemArray } from "../../../utilities/sorts";
const sendErrorForward = sendErrorForwardNoFile('get beast')

export function hasAppropriatePatreonLevel(user: User | undefined, beastPatron: number, canPlayerView: boolean): string {
    if (canPlayerView || (user && isOwner(user.id))) {
        return 'gm'
    } else if (user && user.patreon) {
        let effectivePatreon = beastPatron === 0 ? beastPatron + 3 : beastPatron
        if (effectivePatreon >= user.patreon) {
            return 'gm'
        } else {
            return 'player'
        }
    }
    return 'player'
}

export async function getTypes(databaseConnection: any, beastId: number): Promise<BeastType[]> {
    const beastTypes: BeastType[] = await databaseConnection.beast.type.get(beastId)

    return beastTypes.map(type => {
        return {
            ...type
        }
    })
}

export async function getClimates(databaseConnection: any, beastId: number): Promise<ClimateObject> {
    const beast: Climate[] = await databaseConnection.beast.climate.get(beastId)
    const allclimates = await databaseConnection.beast.climate.getAll()
    return {
        beast,
        allclimates
    }
}

export async function getArtistInfo(databaseConnection: any, beastId: number, isEditing: boolean): Promise<ArtistObject> {
    let allartists: ArtistInfo[] = []
    if (isEditing) {
        allartists = await databaseConnection.beast.artist.getAll(beastId)
    }

    const genericArtistInfo: ArtistInfo[] = await databaseConnection.beast.artist.get(beastId)

    return {
        genericArtistInfo: genericArtistInfo[0],
        roleartists: genericArtistInfo.splice(1),
        allartists
    }
}

export async function getLocations(databaseConnection: any, beastId: number, isEditing: boolean): Promise<LocationObject> {
    let alllocations: Location[] = []
    if (isEditing) {
        alllocations = await databaseConnection.beast.location.getAll(beastId)
    }

    const beast: Location[] = await databaseConnection.beast.location.get(beastId)

    return {
        beast,
        alllocations
    }
}

export async function getVariants(databaseConnection: any, beastId: number): Promise<Variant[]> {
    return databaseConnection.beast.variant.get(beastId)
}

export async function getSpecificLoots(databaseConnection: any, beastId: number): Promise<SpecificLoot[]> {
    return databaseConnection.loot.specific.get(beastId)
}

export async function getLairBasic(databaseConnection: any, beastId: number): Promise<Loot> {
    const [lootInfo] = await databaseConnection.loot.lair.getBasic(beastId)
    return lootInfo
}

export async function getLairAlms(databaseConnection: any, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.lair.getAlm(beastId)
}

export async function getLairItems(databaseConnection: any, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    const items: Item[] = await databaseConnection.loot.lair.getItem(beastId)

    if (isEditing) {
        return objectifyItemArray(items)
    } else {
        return items
    }
}

export async function getLairScrolls(databaseConnection: any, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.lair.getScroll(beastId)
}

export async function getCarriedBasic(databaseConnection: any, beastId: number): Promise<Loot> {
    const [lootInfo] = await databaseConnection.loot.carried.getBasic(beastId)
    return lootInfo
}

export async function getCarriedAlms(databaseConnection: any, beastId: number): Promise<Alm[]> {
    return databaseConnection.loot.carried.getAlm(beastId)
}

export async function getCarriedItems(databaseConnection: any, beastId: number, isEditing: boolean): Promise<Item[] | Object> {
    const items: Item[] = await databaseConnection.loot.carried.getItem(beastId)

    if (isEditing) {
        return objectifyItemArray(items)
    } else {
        return items
    }
}

export async function getCarriedScrolls(databaseConnection: any, beastId: number): Promise<Scroll[]> {
    return databaseConnection.loot.carried.getScroll(beastId)
}

export async function getPleroma(databaseConnection: any, beastId: number): Promise<Pleroma[]> {
    return databaseConnection.beast.pleroma.get(beastId)
}

export async function getLocationalVitalities(databaseConnection: any, beastId: number): Promise<LocationVitality[]> {
    const returnedVitalities = await databaseConnection.beast.locationalVitality.get(beastId)

    return returnedVitalities.map((vitality: LocationVitality) => {
        return {
            ...vitality,
            vitality: rollDice(vitality.vitality)
        }
    })
}

export async function getFolklore(databaseConnection: any, beastId: number): Promise<Folklore[]> {
    return databaseConnection.beast.folklore.get(beastId)
}

export async function getScenarios(databaseConnection: any, beastId: number): Promise<Scenario[]> {
    return databaseConnection.beast.scenario.get(beastId)
}

export async function getCasting(databaseConnection: any, beastId: number): Promise<Casting> {
    const [casting] = await databaseConnection.beast.casting.get(beastId)
    const { augur, wild, vancian, manifesting, commanding, bloodpact, spellnumberdie, defaulttype, beastid } = casting

    // currently this is a string but, as I migrate monsters, I want to change it over to just use the index so this is just a temporary stopgap
    const defaultTypeIndexDictionary = {
        'Augury': 0,
        'Wild Magic': 1,
        'Vancian': 2,
        'Manifesting': 3,
        'Adamic Commanding': 4,
        'Blood Pact': 5
    }

    return {
        spellnumberdie, beastid,
        defaulttype: defaultTypeIndexDictionary[defaulttype],
        castingTypesArray: [augur, wild, vancian, manifesting, commanding, bloodpact]
    }
}

export async function getSpells(databaseConnection: any, beastId: number): Promise<Spell[]> {
    return databaseConnection.beast.spell.get(beastId)
}