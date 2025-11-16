import { SkillObject } from "../../../interfaces/beast/infoInterfaces/skillInfoInterfaces"
import getSkillRank from "./getSkillRank"

export default function getSkills(role: string, skullIndex: number): SkillObject {
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
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Survival',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Strategy',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Lore',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Loremaster':
            return {
                preferred: [
                    {
                        skill: 'Lore',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Strategy',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Athletics',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Streetwise',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Strategist':
            return {
                preferred: [
                    {
                        skill: 'Strategy',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Trades',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Weirdcraft',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Survivalist',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Street-Rat':
            return {
                preferred: [
                    {
                        skill: 'Streetwise',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Athletics',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Lore',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Weirdcraft',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Survivalist':
            return {
                preferred: [
                    {
                        skill: 'Survival',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Weirdcraft',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Strategy',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Streetwise',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Trader':
            return {
                preferred: [
                    {
                        skill: 'Trades',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Lore',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Athletics',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Weirdcraft',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        case 'Weirdling':
            return {
                preferred: [
                    {
                        skill: 'Weirdcraft',
                        rank: getSkillRank(skullIndex + 3)
                    }, {
                        skill: 'Lore',
                        rank: getSkillRank(skullIndex + 1)
                    }
                ],
                weakness: [
                    {
                        skill: 'Trades',
                        rank: getSkillRank(skullIndex - 1)
                    }, {
                        skill: 'Athletics',
                        rank: getSkillRank(skullIndex - 3)
                    }
                ],
                everythingElse: getSkillRank(skullIndex)
            }
        default:
            return {}
    }
}