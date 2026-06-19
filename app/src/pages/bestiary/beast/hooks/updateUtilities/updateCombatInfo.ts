import { AttackStats, BonfireDefenseInfo, DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { shiftAttackOrder } from "./combatUtilities/updateAttacks"
import { shiftDefenseOrder } from "./combatUtilities/updateDefenses"
import { UpdateFunction, UpdateOrderFunction, UpdateAttackDefenseStatsFunction, AddAttackFunction, RemoveCombatFunction, AddCombatFunction } from "./interfaces/updateInterfaces"
import { BonfireRoleCombatInfo, HackMasterRoleCombatInfo, NonspecificRoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/combatInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"

export type UpdateCombatInfoFunctionsObject = {
    updateCombatInfo: UpdateFunction,
    updateNonRoleInfo: UpdateFunction,
    updateAttackOrder: UpdateOrderFunction,
    updateAttackStats: UpdateAttackDefenseStatsFunction,
    addAttack: AddAttackFunction,
    updateDefenseInfo: UpdateAttackDefenseStatsFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
    addDefense: AddCombatFunction,
    removeAttack: RemoveCombatFunction
}

export default function getUpdateCombatInfoFunctions(
    beast: GMBeastClass | undefined,
    updateBeastInfo: Function
): UpdateCombatInfoFunctionsObject {
    return {
        updateCombatInfo: (key: string, value: any) => {
            if (beast && beast.selectedRole) {
                let modifiedCombatInfo: BonfireRoleCombatInfo | HackMasterRoleCombatInfo | NonspecificRoleCombatInfo = {
                    ...beast.selectedRole.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    roleInfo: {
                        ...beast.beastInfo.roleInfo,
                        roles: beast.beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === beast.selectedRoleIndex) {
                                return {
                                    ...role,
                                    combatInfo: modifiedCombatInfo
                                }
                            }
                            return role
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            } else if (beast) {
                let modifiedCombatInfo = {
                    ...beast.beastInfo.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: modifiedCombatInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateNonRoleInfo: (key: string, value: any) => {
            if (beast) {
                let modifiedCombatInfo = {
                    ...beast.beastInfo.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: modifiedCombatInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateAttackStats: (key: string, value: string, overAllIndex: number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        attacks: beast.beastInfo.combatInfo.attacks.map((attack: AttackStats, index: number) => {
                            if (index == overAllIndex) {
                                const valueToChangeTo = value === attack[key as keyof AttackStats] ? null : value
                                return {
                                    ...attack,
                                    [key]: valueToChangeTo
                                }
                            } else {
                                return attack
                            }
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        addAttack: (newAttack: AttackStats) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        attacks: [
                            ...beast.beastInfo.combatInfo.attacks,
                            {
                                ...newAttack,
                                roleid: beast.selectedRoleID,
                                overAllIndex: beast.beastInfo.combatInfo.attacks.length
                            }
                        ]
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        removeAttack: (indexToRemove: number) => {
            if (beast) {
                const attacks = beast.beastInfo.combatInfo.attacks.reduce((attacks: AttackStats[], attack: AttackStats) => {
                    if (attack.overAllIndex !== indexToRemove) {
                        attacks.push({
                            ...attack,
                            overAllIndex: attacks.length
                        })
                    }

                    return attacks
                }, [])

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        attacks
                    },
                }
                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateAttackOrder: (overAllIndex: number, overAllIndexToMoveTo: number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        attacks: shiftAttackOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.attacks)
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateDefenseInfo: (key: string, value: string, overAllIndex: number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        defenses: beast.beastInfo.combatInfo.defenses.reduce((defenses: DefenseInfo[], defense: DefenseInfo, index: number) => {
                            if (index == overAllIndex) {
                                defenses.push({
                                    ...defense,
                                    [key]: value
                                })
                            } else {
                                defenses.push(defense)
                            }
                            return defenses
                        }, [])
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateDefenseOrder: (overAllIndex: number, overAllIndexToMoveTo: number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        defenses: shiftDefenseOrder(overAllIndex, overAllIndexToMoveTo, beast.beastInfo.combatInfo.defenses)
                    }
                }
console.log(modifiedBeastInfo.combatInfo.defenses)
                updateBeastInfo(modifiedBeastInfo)
            }
        },
        removeDefense: (indexToRemove: number) => {
            if (beast) {
                const defenses = beast.beastInfo.combatInfo.defenses.reduce((defenses: DefenseInfo[], defense: DefenseInfo) => {
                    if (defense.overAllIndex !== indexToRemove) {
                        defenses.push({
                            ...defense,
                            overAllIndex: defenses.length
                        })
                    }

                    return defenses
                }, [])

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        defenses
                    },
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        addDefense: (defense: DefenseInfo | undefined) => {
            if (beast) {
                const newDefense: DefenseInfo = defense ? {
                    ...defense,
                    id: undefined,
                    oldID: undefined,
                    roleid: beast.selectedRoleID,
                    overAllIndex: beast.beastInfo.combatInfo.defenses.length,
                } : {
                    ...beast.beastInfo.combatInfo.defenses[beast.beastInfo.combatInfo.defenses.length - 1],
                    id: undefined,
                    oldID: undefined,
                    roleid: beast.selectedRoleID,
                    overAllIndex: beast.beastInfo.combatInfo.defenses.length,
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        defenses: [
                            ...beast.beastInfo.combatInfo.defenses,
                            newDefense
                        ]
                    },
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}
