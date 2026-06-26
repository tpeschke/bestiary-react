import { AttackStats, BonfireDefenseInfo, DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import { BeastInfo } from "../../interfaces/viewInterfaces"
import { getSelectedRole, getSelectedRoleID, getSelectedRoleIndex } from "../getUtilities/activeBeastSelectors"
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
    beastInfo: BeastInfo | undefined,
    roleId: string | null,
    updateBeastInfo: Function
): UpdateCombatInfoFunctionsObject {
    const selectedRole = beastInfo ? getSelectedRole(beastInfo, roleId) : null
    const selectedRoleIndex = beastInfo ? getSelectedRoleIndex(beastInfo, roleId) : -1
    const selectedRoleID = beastInfo ? getSelectedRoleID(beastInfo, roleId) : null

    return {
        updateCombatInfo: (key: string, value: any) => {
            if (beastInfo && selectedRole) {
                let modifiedCombatInfo: BonfireRoleCombatInfo | HackMasterRoleCombatInfo | NonspecificRoleCombatInfo = {
                    ...selectedRole.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    roleInfo: {
                        ...beastInfo.roleInfo,
                        roles: beastInfo.roleInfo.roles.map((role: Role, index: number) => {
                            if (index === selectedRoleIndex) {
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
            } else if (beastInfo) {
                let modifiedCombatInfo = {
                    ...beastInfo.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: modifiedCombatInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateNonRoleInfo: (key: string, value: any) => {
            if (beastInfo) {
                let modifiedCombatInfo = {
                    ...beastInfo.combatInfo,
                    [key]: value
                }

                if (key === 'combatSkulls' && typeof value === 'number') {
                    modifiedCombatInfo.skullIndex = getSkullIndex(value)
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: modifiedCombatInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateAttackStats: (key: string, value: string, overAllIndex: number) => {
            if (beastInfo) {
                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        attacks: beastInfo.combatInfo.attacks.map((attack: AttackStats, index: number) => {
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
            if (beastInfo) {
                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        attacks: [
                            ...beastInfo.combatInfo.attacks,
                            {
                                ...newAttack,
                                roleid: selectedRoleID,
                                overAllIndex: beastInfo.combatInfo.attacks.length
                            }
                        ]
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        removeAttack: (indexToRemove: number) => {
            if (beastInfo) {
                const attacks = beastInfo.combatInfo.attacks.reduce((attacks: AttackStats[], attack: AttackStats) => {
                    if (attack.overAllIndex !== indexToRemove) {
                        attacks.push({
                            ...attack,
                            overAllIndex: attacks.length
                        })
                    }

                    return attacks
                }, [])

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        attacks
                    },
                }
                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateAttackOrder: (overAllIndex: number, overAllIndexToMoveTo: number) => {
            if (beastInfo) {
                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        attacks: shiftAttackOrder(overAllIndex, overAllIndexToMoveTo, beastInfo.combatInfo.attacks)
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateDefenseInfo: (key: string, value: any, overAllIndex: number) => {
            if (beastInfo) {
                const newDefense = {
                    ...beastInfo.combatInfo.defenses[overAllIndex],
                    [key]: value
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        defenses: beastInfo.combatInfo.defenses.map((defense: DefenseInfo, index: number) => {
                            if (index == overAllIndex) {
                                return newDefense
                            } else {
                                return defense
                            }
                        })
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateDefenseOrder: (overAllIndex: number, overAllIndexToMoveTo: number) => {
            if (beastInfo) {
                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        defenses: shiftDefenseOrder(overAllIndex, overAllIndexToMoveTo, beastInfo.combatInfo.defenses)
                    }
                }
                updateBeastInfo(modifiedBeastInfo)
            }
        },
        removeDefense: (indexToRemove: number) => {
            if (beastInfo) {
                const defenses = beastInfo.combatInfo.defenses.reduce((defenses: DefenseInfo[], defense: DefenseInfo) => {
                    if (defense.overAllIndex !== indexToRemove) {
                        defenses.push({
                            ...defense,
                            overAllIndex: defenses.length
                        })
                    }

                    return defenses
                }, [])

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        defenses
                    },
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        addDefense: (defense: DefenseInfo | undefined) => {
            if (beastInfo) {
                const newDefense: DefenseInfo = defense ? {
                    ...defense,
                    id: undefined,
                    oldID: undefined,
                    roleid: selectedRoleID,
                    overAllIndex: beastInfo.combatInfo.defenses.length,
                } : {
                    ...beastInfo.combatInfo.defenses[beastInfo.combatInfo.defenses.length - 1],
                    id: undefined,
                    oldID: undefined,
                    roleid: selectedRoleID,
                    overAllIndex: beastInfo.combatInfo.defenses.length,
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    combatInfo: {
                        ...beastInfo.combatInfo,
                        defenses: [
                            ...beastInfo.combatInfo.defenses,
                            newDefense
                        ]
                    },
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}
