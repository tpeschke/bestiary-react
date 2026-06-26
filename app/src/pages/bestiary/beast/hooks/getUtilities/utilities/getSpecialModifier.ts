import { BeastInfo } from "../../../interfaces/viewInterfaces"

export function getSpecialModifier(beastInfo: BeastInfo): number {
    if (beastInfo.system === 'HackMaster') {
        return beastInfo.roleModifier * 3
    }

    return beastInfo.roleModifier
}