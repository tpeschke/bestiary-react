import { SocialSkillSuitesObject } from "../../../../interfaces/beast/infoInterfaces/socialInfoInterfaces"
import calculateConvictionRank from "./calculateConvictionRank"
import calculateDescriptionRank from "./calculateDescriptionRank"

export default function getSocialSkillSuites(role: string, skullIndex: number): SocialSkillSuitesObject {
    switch (role) {
        case 'Advocate':
            return {
                empathize: calculateDescriptionRank(skullIndex + 3),
                intimidate: calculateDescriptionRank(skullIndex - 3),
                lecture: calculateDescriptionRank(skullIndex - 2),
                tempt: calculateDescriptionRank(skullIndex - 1),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Bully':
            return {
                empathize: calculateDescriptionRank(skullIndex - 1),
                intimidate: calculateDescriptionRank(skullIndex + 3),
                lecture: calculateDescriptionRank(skullIndex - 3),
                tempt: calculateDescriptionRank(skullIndex - 2),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Charmer':
            return {
                empathize: calculateDescriptionRank(skullIndex + 2),
                intimidate: calculateDescriptionRank(skullIndex - 3),
                lecture: calculateDescriptionRank(skullIndex - 2),
                tempt: calculateDescriptionRank(skullIndex + 3),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Empath':
            return {
                empathize: calculateDescriptionRank(skullIndex + 3),
                intimidate: calculateDescriptionRank(skullIndex),
                lecture: calculateDescriptionRank(skullIndex - 1),
                tempt: calculateDescriptionRank(skullIndex + 1),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Enabler':
            return {
                empathize: calculateDescriptionRank(skullIndex + 1),
                intimidate: calculateDescriptionRank(skullIndex - 1),
                lecture: calculateDescriptionRank(skullIndex - 2),
                tempt: calculateDescriptionRank(skullIndex + 3),
                preferredEmotions: {
                    emotions: ["Joy", "Anger"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Instructor':
            return {
                empathize: calculateDescriptionRank(skullIndex - 2),
                intimidate: calculateDescriptionRank(skullIndex - 1),
                lecture: calculateDescriptionRank(skullIndex + 3),
                tempt: calculateDescriptionRank(skullIndex - 3),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Obdurate':
            return {
                empathize: calculateDescriptionRank(skullIndex - 3),
                intimidate: calculateDescriptionRank(skullIndex + 1),
                lecture: calculateDescriptionRank(skullIndex + 2),
                tempt: calculateDescriptionRank(skullIndex - 2),
                preferredEmotions: {
                    emotions: ["Depression", "Surprise"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        case 'Zealot':
            return {
                empathize: calculateDescriptionRank(skullIndex - 2),
                intimidate: calculateDescriptionRank(skullIndex + 2),
                lecture: calculateDescriptionRank(skullIndex - 1),
                tempt: calculateDescriptionRank(skullIndex),
                preferredEmotions: {
                    emotions: ["Fear", "Disgust"],
                    rank: calculateConvictionRank(skullIndex, role)
                }
            }
        default:
            return {
                empathize: calculateDescriptionRank(skullIndex),
                intimidate: calculateDescriptionRank(skullIndex),
                lecture: calculateDescriptionRank(skullIndex),
                tempt: calculateDescriptionRank(skullIndex),
                preferredEmotions: { emotions: [], rank: calculateConvictionRank(skullIndex, role) }
            }
    }
}