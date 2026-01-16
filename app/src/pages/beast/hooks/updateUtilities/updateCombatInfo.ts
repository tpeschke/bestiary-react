import { AttackInfo, DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { RoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { shiftAttackOrder } from "./combatUtilities/updateAttacks"
import { shiftDefenseOrder } from "./combatUtilities/updateDefenses"
import { UpdateFunction, UpdateOrderFunction, UpdateAttackDefenseInfoFunction, AddAttackFunction, RemoveCombatFunction } from "./interfaces/updateInterfaces"

export type UpdateCombatInfoFunctionsObject = {
    updateCombatInfo: UpdateFunction,
    updateAttackOrder: UpdateOrderFunction,
    updateAttackInfo: UpdateAttackDefenseInfoFunction,
    addAttack: AddAttackFunction,
    updateDefenseInfo: UpdateAttackDefenseInfoFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
    removeAttack: RemoveCombatFunction
}

export default function getUpdateCombatInfoFunctions(
    beast: GMBeastClass | undefined,
    updateBeastInfo: Function
): UpdateCombatInfoFunctionsObject {
    return {
        updateCombatInfo: (key: string, value: any) => {
            if (beast && beast.selectedRole) {
                let modifiedCombatInfo: RoleCombatInfo = {
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
                        roles: beast.beastInfo.roleInfo.roles.map((role, index) => {
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
        updateAttackInfo: (key: string, value: string, overAllIndex: number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    combatInfo: {
                        ...beast.beastInfo.combatInfo,
                        attacks: beast.beastInfo.combatInfo.attacks.map((attack: AttackInfo, index: number) => {
                            if (index == overAllIndex) {
                                const valueToChangeTo = value === attack[key as keyof AttackInfo] ? null : value
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
        addAttack: (newAttack: AttackInfo) => {
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
                const attacks = beast.beastInfo.combatInfo.attacks.reduce((attacks: AttackInfo[], attack: AttackInfo) => {
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
        }
    }
}
