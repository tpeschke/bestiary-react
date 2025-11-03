import query from "../../../db/database";
import { searchAccess, searchBody, searchChallengeRoles, searchClimate, searchCombatRoles, searchConfrontationRoles, searchMaxChallengeRating, searchMaxCombatRating, searchMaxConfrontationRating, searchMinChallengeRating, searchMinCombatRating, searchName, searchNotes, searchPlayerCanView, searchRarity, searchSize, searchTypes } from "../../../db/search/queryParams";
import { User } from "../../../interfaces/apiInterfaces";
import { SearchQuery, SearchReturn } from "../search";
import getRoleName from "./roleName";

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
                if (searchQuery.climate !== '') {
                    searchQuery.climate.split(',').forEach((climateID: string) => {
                        idArray.push(query(searchClimate, +climateID))
                    })
                }
                break;
            // TODO: And this one
            case "types":
                if (searchQuery.types !== '') {
                    searchQuery.types.split(',').forEach((typeID: string) => {
                        idArray.push(query(searchTypes, +typeID))
                    })
                }
                break;
            case "roles":
                if (searchQuery.roles !== '') {
                    searchQuery.roles.split(',').forEach((roleIDString: string) => {
                        const roleID = +roleIDString
                        const roleName = getRoleName(roleID)

                        if (roleID < 11 || roleID === 32 || roleID === 33) {
                            idArray.push(query(searchConfrontationRoles, roleName))
                        } else if (roleID > 10 && roleID < 22) {
                            idArray.push(query(searchCombatRoles, roleName))
                        } else {
                            idArray.push(query(searchChallengeRoles, roleName))
                        }
                    })
                }
                break;
        }
    }

    return Promise.all(idArray)
}