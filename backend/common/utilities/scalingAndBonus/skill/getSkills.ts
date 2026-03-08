import { SkillObject } from "../../../interfaces/beast/infoInterfaces/skillInfoInterfaces"
import getSkillRank from "./getSkillRank"

export default function getSkills(role: string, skullIndex: number, skillObject?: SkillObject): SkillObject {
    const calcPreferredRankDictionary = [
        getSkillRank(skullIndex + 3),
        getSkillRank(skullIndex + 1)
    ]

    const calcWeakRankDictionary = [
        getSkillRank(skullIndex - 1),
        getSkillRank(skullIndex - 3)
    ]

    if (skillObject) {
        return {
            ...skillObject,
            preferred: skillObject.preferred?.map((skill, index) => {
                return {
                    ...skill,
                    rank: calcPreferredRankDictionary[index]
                }
            }),
            weakness: skillObject.weakness?.map((skill, index) => {
                return {
                    ...skill,
                    rank: calcWeakRankDictionary[index]
                }
            }),
        }
    }

    switch (role) {
        case 'Generalist':
            return {
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Lock':
            return {}
        case 'Athlete':
            return {
                preferred: [
                    {
                        skill: 'Athletics',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Survival',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Strategy',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Lore',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Loremaster':
            return {
                preferred: [
                    {
                        skill: 'Lore',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Strategy',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Athletics',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Streetwise',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Strategist':
            return {
                preferred: [
                    {
                        skill: 'Strategy',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Trades',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Weirdcraft',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Survivalist',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Street-Rat':
            return {
                preferred: [
                    {
                        skill: 'Streetwise',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Athletics',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Lore',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Weirdcraft',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Survivalist':
            return {
                preferred: [
                    {
                        skill: 'Survival',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Weirdcraft',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Strategy',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Streetwise',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Trader':
            return {
                preferred: [
                    {
                        skill: 'Trades',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Lore',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Athletics',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Weirdcraft',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Weirdling':
            return {
                preferred: [
                    {
                        skill: 'Weirdcraft',
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: 'Lore',
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: 'Trades',
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: 'Athletics',
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        default:
            return {}
    }
}