import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"
import getModBySkullIndex from "../getModBySkullIndex"

export default function calculateStress(secondaryRole: string, skullIndex: number): number | string {
    const stressDictionary = [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57]

    return calculateSecondaryRoleEffect(getModBySkullIndex(skullIndex, 0, stressDictionary), secondaryRole)
}