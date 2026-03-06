import { EditEncounter } from "../../../../../../interfaces/bestiary/encounterInterfaces";
import updateReaction from "./utilities/updateReaction";

export default function updateEncounter(randomEncounterInfo: EditEncounter | null) {
    if (randomEncounterInfo) {
        const { beastID, reaction } = randomEncounterInfo

        return Promise.all([
            updateReaction(beastID, reaction)
        ])
    }

    return true
}