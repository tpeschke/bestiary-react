import { AttackStats } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export type UpdateFunction = (key: string, value: any) => void
export type UpdateArrayFunction = (key: string, value: any[]) => void

export type UpdateOrderFunction = (overAllIndex: number, overAllIndexToMoveTo: number) => void
export type RemoveCombatFunction = (indexToRemove: number) => void
export type UpdateAttackDefenseStatsFunction = (key: string, value: string, overAllIndex: number) => void
export type AddAttackFunction = (newAttack: AttackStats) => void