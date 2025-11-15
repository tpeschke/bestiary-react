import query from "../../../db/database";
import { searchAccess, searchBody, searchChallengeRoles, searchClimate, searchCombatRoles, searchConfrontationRoles, searchMaxChallengeRating, searchMaxCombatRating, searchMaxConfrontationRating, searchMinChallengeRating, searchMinCombatRating, searchName, searchNotes, searchPlayerCanView, searchRarity, searchSize, searchTypes } from "../../../db/search/queryParams";
import { User } from "../../../interfaces/apiInterfaces";
import { SearchQuery, SearchReturn } from "../search";
import { getCombatRoleName, getSkillRoleName, getSocialRoleName } from "./roleName";

export default async function getIDsFromQuery(searchQuery: SearchQuery, user: User | null | undefined): Promise<SearchReturn[][]> {
    let idArray: Promise<any[]>[] = []

    for (const item in searchQuery) {
        switch (item) {
            case "name":
                idArray.push(query(searchName, searchQuery.name))
                break;
            case "body":
                idArray.push(query(searchBody, searchQuery.body))
                break;
            case "minCombatRate":
                idArray.push(query(searchMinCombatRating, searchQuery.minCombatRate))
                break;
            case "minChallengeRate":
                idArray.push(query(searchMinChallengeRating, searchQuery.minChallengeRate))
                break;
            case "minConfrontationRate":
                idArray.push(query(searchMinCombatRating, searchQuery.minConfrontationRate))
                break;
            case "maxCombatRate":
                idArray.push(query(searchMaxCombatRating, searchQuery.maxCombatRate))
                break;
            case "maxChallengeRate":
                idArray.push(query(searchMaxChallengeRating, searchQuery.maxChallengeRate))
                break;
            case "maxConfrontationRate":
                idArray.push(query(searchMaxConfrontationRating, searchQuery.maxConfrontationRate))
                break;
            case "size":
                idArray.push(query(searchSize, searchQuery.size))
                break;
            case "access":
                idArray.push(query(searchAccess, searchQuery.access))
                break;
            case "rarity":
                idArray.push(query(searchRarity, searchQuery.rarity))
                break;
            case "anyAccess":
                idArray.push(query(searchPlayerCanView))
                break;
            case "personalNotes":
                if (user) {
                    idArray.push(query(searchNotes, user.id))
                }
                break;
            // TODO: Update to just search using the array so I don't have to iterate through it like this
            case "climate":
                if (typeof searchQuery.climate === 'string') {
                    idArray.push(query(searchClimate, +searchQuery.climate))
                } else if (searchQuery.climate) {
                    searchQuery.climate.forEach((climateID: string) => {
                        idArray.push(query(searchClimate, +climateID))
                    })
                }
                break;
            // TODO: And this one
            case "types":
                if (typeof searchQuery.types === 'string') {
                    idArray.push(query(searchTypes, +searchQuery.types))
                } else if (searchQuery.types) {
                    searchQuery.types.forEach((typeID: string) => {
                        idArray.push(query(searchTypes, +typeID))
                    })
                }
                break;
            case "socialRoles":
                if (typeof searchQuery.socialRoles === 'string') {
                    idArray.push(query(searchConfrontationRoles, getSocialRoleName(searchQuery.socialRoles)))
                } else if (searchQuery.socialRoles) {
                    searchQuery.socialRoles.forEach((roleIDString: string) => {
                        idArray.push(query(searchConfrontationRoles, getSocialRoleName(roleIDString)))
                    })
                }
                break;
            case "combatRoles":
                if (typeof searchQuery.combatRoles === 'string') {
                    idArray.push(query(searchCombatRoles, getCombatRoleName(searchQuery.combatRoles)))
                } else if (searchQuery.combatRoles) {
                    searchQuery.combatRoles.forEach((roleIDString: string) => {
                        idArray.push(query(searchCombatRoles, getCombatRoleName(roleIDString)))
                    })
                }
                break;
            case "skillRoles":
                if (typeof searchQuery.skillRoles === 'string') {
                    idArray.push(query(searchChallengeRoles, getSkillRoleName(searchQuery.skillRoles)))
                } else if (searchQuery.skillRoles) {
                    searchQuery.skillRoles.forEach((roleIDString: string) => {
                        idArray.push(query(searchChallengeRoles, getSkillRoleName(roleIDString)))
                    })
                }
                break;
        }
    }

    return Promise.all(idArray)
}
