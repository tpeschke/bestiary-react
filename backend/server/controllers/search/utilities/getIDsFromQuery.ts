import { User } from "../../../interfaces/apiInterfaces";
import { SearchQuery, SearchReturn } from "../search";
import getRoleName from "./roleName";

export default async function getIDsFromQuery(databaseConnection: any, query: SearchQuery, user: User | null | undefined): Promise<SearchReturn[][]> {
    let idArray: SearchReturn[][] = []

    for (const item in query) {
        switch (item) {
            case "name":
                idArray.push(databaseConnection.search.queryParams.name(query.name))
                break;
            case "body":
                idArray.push(databaseConnection.search.queryParams.body(query.body))
                break;
            case "minCombatRate":
                idArray.push(databaseConnection.search.queryParams.minCombatRating(query.minCombatRate))
                break;
            case "minChallengeRate":
                idArray.push(databaseConnection.search.queryParams.minChallengeRating(query.minChallengeRate))
                break;
            case "minConfrontationRate":
                idArray.push(databaseConnection.search.queryParams.minConfrontationRating(query.minConfrontationRate))
                break;
            case "maxCombatRate":
                idArray.push(databaseConnection.search.queryParams.maxCombatRating(query.maxCombatRate))
                break;
            case "maxChallengeRate":
                idArray.push(databaseConnection.search.queryParams.maxChallengeRating(query.maxChallengeRate))
                break;
            case "maxConfrontationRate":
                idArray.push(databaseConnection.search.queryParams.maxConfrontationRating(query.maxConfrontationRate))
                break;
            case "size":
                idArray.push(databaseConnection.search.queryParams.size(query.size))
                break;
            case "access":
                idArray.push(databaseConnection.search.queryParams.access(query.access))
                break;
            case "rarity":
                idArray.push(databaseConnection.search.queryParams.rarity(query.rarity))
                break;
            case "anyAccess":
                idArray.push(databaseConnection.search.queryParams.playerView())
                break;
            case "personalNotes":
                if (user) {
                    idArray.push(databaseConnection.search.queryParams.personalNotes(user.id))
                }
                break;
            // TODO: Update to just search using the array so I don't have to iterate through it like this
            case "climate":
                if (query.climate !== '') {
                    query.climate.split(',').forEach((climateID: string) => {
                        idArray.push(databaseConnection.search.queryParams.climate(+climateID))
                    })
                }
                break;
            // TODO: And this one
            case "types":
                if (query.types !== '') {
                    query.types.split(',').forEach((typeID: string) => {
                        idArray.push(databaseConnection.search.queryParams.types(+typeID))
                    })
                }
                break;
            case "roles":
                if (query.roles !== '') {
                    query.roles.split(',').forEach((roleIDString: string) => {
                        const roleID = +roleIDString
                        const roleName = getRoleName(roleID)

                        if (roleID < 11 || roleID === 32 || roleID === 33) {
                            idArray.push(databaseConnection.search.queryParams.rolesConfrontation(roleName))
                        } else if (roleID > 10 && roleID < 22) {
                            idArray.push(databaseConnection.search.queryParams.rolesCombat(roleName))
                        } else {
                            idArray.push(databaseConnection.search.queryParams.rolesSkill(roleName))
                        }
                    })
                }
                break;
        }
    }

    return Promise.all(idArray)
}