import { AttackInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export type UpdateFunction = (key: string, value: any) => void

export type UpdateOrderFunction = (overAllIndex: number, overAllIndexToMoveTo: number) => void
export type RemoveCombatFunction = (indexToRemove: number) => void
export type UpdateAttackDefenseInfoFunction = (key: string, value: string, overAllIndex: number) => void
export type AddAttackFunction = (newAttack: AttackInfo) => void