import { IsSpecial, DamageType, Type } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getWeaponName } from "../../formatting/formatting"

import { ProcessedWeapon } from "../../../../server/controllers/gear/interfaces/weaponInterfaces"
import getAttackMod from "./attackUtilities/getAttackMod"
import getRangeIncrement from "./attackUtilities/getRangeIncrement"
import getDamage from "./attackUtilities/getDamage"
import getRecovery from "./attackUtilities/getRecovery"
import getMeasure from "./attackUtilities/getMeasure"
import { Size } from "../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"

export default function calculateAndFormatAttackInfo(
    skullIndex: number,
    role: string,
    chosenName: string,
    weaponName: string,
    weaponType: Type,
    isSpecial: IsSpecial,
    damageType: DamageType,
    weaponInfo: ProcessedWeapon | null,
    addSizeMod: boolean, 
    size: Size = 'Medium',
    gearCache?: any
) {
    const weaponInfoObject = weaponInfo ? weaponInfo : gearCache?.weapons.dictionary[weaponName]

    if (weaponInfoObject) {
        const { measure, type, name, bonus, range } = weaponInfoObject

        return {
            measure, type, bonus, weaponInfo: weaponInfoObject,
            name: getWeaponName(chosenName, name),
            weaponName: name,
            attack: getAttackMod(range, role, skullIndex),
            rangeIncrement: range ? getRangeIncrement(range, role, skullIndex) : null,
            damage: getDamage(isSpecial, range, type, role, skullIndex),
            recovery: getRecovery(range, role, skullIndex)
        }
    }

    const isRanged = weaponType === 'r'
    return {
        name: chosenName,
        type: damageType,
        measure: getMeasure(addSizeMod, size, isRanged, role, skullIndex),
        attack: getAttackMod(isRanged, role, skullIndex),
        rangeIncrement: isRanged ? getRangeIncrement(isRanged, role, skullIndex) : null,
        damage: getDamage(isSpecial, isRanged, damageType, role, skullIndex),
        recovery: getRecovery(isRanged, role, skullIndex)
    }
}

