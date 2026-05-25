import { SystemOption } from "../../../../../interfaces/beast/beast"
import { SocialSkillSuitesObject } from "../../../../../interfaces/beast/infoInterfaces/socialInfoInterfaces"
import calculateConvictionRank from "./calculateConvictionRank"
import calculateDescriptionRank from "./calculateDescriptionRank"

export default function getSocialSkillSuites(role: string, skullIndex: number, system: SystemOption = 'Bonfire'): SocialSkillSuitesObject {
    switch (role) {
        case 'Advocate':
            return {
                inspire: calculateDescriptionRank(skullIndex + 3, system),
                intimidate: calculateDescriptionRank(skullIndex - 3, system),
                lecture: calculateDescriptionRank(skullIndex - 2, system),
                tempt: calculateDescriptionRank(skullIndex - 1, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Bully':
            return {
                inspire: calculateDescriptionRank(skullIndex - 1, system),
                intimidate: calculateDescriptionRank(skullIndex + 3, system),
                lecture: calculateDescriptionRank(skullIndex - 3, system),
                tempt: calculateDescriptionRank(skullIndex - 2, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Charmer':
            return {
                inspire: calculateDescriptionRank(skullIndex + 2, system),
                intimidate: calculateDescriptionRank(skullIndex - 3, system),
                lecture: calculateDescriptionRank(skullIndex - 2, system),
                tempt: calculateDescriptionRank(skullIndex + 3, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Demagogue':
            return {
                inspire: calculateDescriptionRank(skullIndex + 3, system),
                intimidate: calculateDescriptionRank(skullIndex, system),
                lecture: calculateDescriptionRank(skullIndex - 1, system),
                tempt: calculateDescriptionRank(skullIndex + 1, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Enabler':
            return {
                inspire: calculateDescriptionRank(skullIndex + 1, system),
                intimidate: calculateDescriptionRank(skullIndex - 1, system),
                lecture: calculateDescriptionRank(skullIndex - 2, system),
                tempt: calculateDescriptionRank(skullIndex + 3, system),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Instructor':
            return {
                inspire: calculateDescriptionRank(skullIndex - 2, system),
                intimidate: calculateDescriptionRank(skullIndex - 1, system),
                lecture: calculateDescriptionRank(skullIndex + 3, system),
                tempt: calculateDescriptionRank(skullIndex - 3, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Obdurate':
            return {
                inspire: calculateDescriptionRank(skullIndex - 3, system),
                intimidate: calculateDescriptionRank(skullIndex + 1, system),
                lecture: calculateDescriptionRank(skullIndex + 2, system),
                tempt: calculateDescriptionRank(skullIndex - 2, system),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Zealot':
            return {
                inspire: calculateDescriptionRank(skullIndex - 2, system),
                intimidate: calculateDescriptionRank(skullIndex + 2, system),
                lecture: calculateDescriptionRank(skullIndex - 1, system),
                tempt: calculateDescriptionRank(skullIndex, system),
                preferredEmotions: {
                    emotions: ["Fear", "Disgust"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        default:
            return {
                inspire: calculateDescriptionRank(skullIndex, system),
                intimidate: calculateDescriptionRank(skullIndex, system),
                lecture: calculateDescriptionRank(skullIndex, system),
                tempt: calculateDescriptionRank(skullIndex, system),
                preferredEmotions: { emotions: [], rank: calculateConvictionRank(skullIndex, role) }
            }
    }
}