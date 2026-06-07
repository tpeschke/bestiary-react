import { SystemOption } from "../../../../../interfaces/beast/beast"
import { SocialSkillSuitesObject } from "../../../../../interfaces/beast/infoInterfaces/socialInfoInterfaces"
import calculateDescriptionRank from "./calculateDescriptionRank"

export default function getSocialSkillSuites(role: string, skullIndex: number, system: SystemOption = 'Bonfire'): SocialSkillSuitesObject {
    switch (role) {
        case 'Advocate':
            return {
                influence: calculateDescriptionRank(skullIndex - 1, system),
                inform: calculateDescriptionRank(skullIndex - 2, system),
                inspire: calculateDescriptionRank(skullIndex + 3, system),
                intimidate: calculateDescriptionRank(skullIndex - 3, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Bully':
            return {
                influence: calculateDescriptionRank(skullIndex - 2, system),
                inform: calculateDescriptionRank(skullIndex - 3, system),
                inspire: calculateDescriptionRank(skullIndex - 1, system),
                intimidate: calculateDescriptionRank(skullIndex + 3, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Charmer':
            return {
                influence: calculateDescriptionRank(skullIndex + 3, system),
                inform: calculateDescriptionRank(skullIndex - 2, system),
                inspire: calculateDescriptionRank(skullIndex + 2, system),
                intimidate: calculateDescriptionRank(skullIndex - 3, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Demagogue':
            return {
                influence: calculateDescriptionRank(skullIndex + 1, system),
                inform: calculateDescriptionRank(skullIndex - 1, system),
                inspire: calculateDescriptionRank(skullIndex + 3, system),
                intimidate: calculateDescriptionRank(skullIndex, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Enabler':
            return {
                influence: calculateDescriptionRank(skullIndex + 3, system),
                inform: calculateDescriptionRank(skullIndex - 2, system),
                inspire: calculateDescriptionRank(skullIndex + 1, system),
                intimidate: calculateDescriptionRank(skullIndex - 1, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Instructor':
            return {
                influence: calculateDescriptionRank(skullIndex - 3, system),
                inform: calculateDescriptionRank(skullIndex + 3, system),
                inspire: calculateDescriptionRank(skullIndex - 2, system),
                intimidate: calculateDescriptionRank(skullIndex - 1, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Obdurate':
            return {
                influence: calculateDescriptionRank(skullIndex - 2, system),
                inform: calculateDescriptionRank(skullIndex + 2, system),
                inspire: calculateDescriptionRank(skullIndex - 3, system),
                intimidate: calculateDescriptionRank(skullIndex + 1, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        case 'Zealot':
            return {
                influence: calculateDescriptionRank(skullIndex, system),
                inform: calculateDescriptionRank(skullIndex - 1, system),
                inspire: calculateDescriptionRank(skullIndex - 2, system),
                intimidate: calculateDescriptionRank(skullIndex + 2, system),
                preferredEmotions: {
                    emotions: ["Fear", "Disgust"],
                    rank: calculateDescriptionRank(skullIndex, system)
                }
            }
        default:
            return {
                influence: calculateDescriptionRank(skullIndex, system),
                inform: calculateDescriptionRank(skullIndex, system),
                inspire: calculateDescriptionRank(skullIndex, system),
                intimidate: calculateDescriptionRank(skullIndex, system),
                preferredEmotions: { emotions: [], rank: calculateDescriptionRank(skullIndex, system) }
            }
    }
}