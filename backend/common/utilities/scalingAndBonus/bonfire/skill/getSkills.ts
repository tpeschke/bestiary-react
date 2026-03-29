import { SystemOption } from "../../../../interfaces/beast/beast"
import { SkillObject } from "../../../../interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { Strength } from "../../../../interfaces/calculationInterfaces"
import getSkillRank from "./getSkillRank"

export default function getSkills(role: string, skullIndex: number, everythingElseStrength: Strength = null, skillObject?: SkillObject, system: SystemOption = 'Bonfire'): SkillObject {
    const calcPreferredRankDictionary = [
        getSkillRank(skullIndex + 3, system),
        getSkillRank(skullIndex + 1, system)
    ]

    const calcWeakRankDictionary = [
        getSkillRank(skullIndex - 1, system),
        getSkillRank(skullIndex - 3, system)
    ]

    const everythingElse = getSkillRank(skullIndex, system)
    if (skillObject) {
        return {
            ...skillObject,
            preferred: skillObject.preferred?.map((skill, index) => {
                return {
                    ...skill,
                    skill: getSkill(system, skill.skill),
                    rank: calcPreferredRankDictionary[index]
                }
            }),
            weakness: skillObject.weakness?.map((skill, index) => {
                return {
                    ...skill,
                    skill: getSkill(system, skill.skill),
                    rank: calcWeakRankDictionary[index]
                }
            }),
            everythingElse,
            everythingElseStrength
        }
    }

    switch (role) {
        case 'Generalist':
            return {
                everythingElse,
                everythingElseStrength
            }
        case 'Lock':
            return {
                everythingElseStrength
            }
        case 'Athlete':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Athletics'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Survival'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Strategy'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Lore'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Loremaster':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Lore'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Strategy'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Athletics'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Streetwise'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Strategist':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Strategy'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Trades'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Weirdcraft'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Survivalist'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Street-Rat':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Streetwise'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Athletics'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Lore'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Weirdcraft'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Survivalist':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Survival'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Weirdcraft'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Strategy'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Streetwise'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Trader':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Trades'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Lore'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Athletics'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Weirdcraft'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        case 'Weirdling':
            return {
                preferred: [
                    {
                        skill: getSkill(system, 'Weirdcraft'),
                        rank: calcPreferredRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Lore'),
                        rank: calcPreferredRankDictionary[1]
                    }
                ],
                weakness: [
                    {
                        skill: getSkill(system, 'Trades'),
                        rank: calcWeakRankDictionary[0]
                    }, {
                        skill: getSkill(system, 'Athletics'),
                        rank: calcWeakRankDictionary[1]
                    }
                ],
                everythingElse,
                everythingElseStrength
            }
        default:
            return {
                everythingElseStrength
            }
    }
}

function getSkill(system: SystemOption, skillName: string) {
    if (system === 'Bonfire') {
        return skillName
    }

    const hackMasterSkillTranslator: { [key: string]: string } = {
        'Athletics': 'Str',
        'Lore': 'Int',
        'Strategy': 'Cha',
        'Streetwise': 'Wis',
        'Survival': 'Con',
        'Trades': 'Dex',
        'Weirdcraft': 'Int'
    }

    return hackMasterSkillTranslator[skillName]
}