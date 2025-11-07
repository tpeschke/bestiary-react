import { IsSpecial, DamageType, Type } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getWeaponName } from "../../formatting/formatting"

import { ProcessedWeapon } from "../../../../server/controllers/gear/interfaces/weaponInterfaces"
import getAttackMod from "./utilities/getAttackMod"
import getRangeIncrement from "./utilities/getRangeIncrement"
import getDamage from "./utilities/getDamage"
import getRecovery from "./utilities/getRecovery"
import getMeasure from "./utilities/getMeasure"

export default function calculateAndFormatAttackInfo(
    skullIndex: number,
    role: string,
    chosenName: string,
    weaponName: string,
    weapontype: Type,
    isSpecial: IsSpecial,
    damageType: DamageType,
    weaponInfo: ProcessedWeapon,
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

    const isRanged = weapontype === 'r'
    return {
        name: chosenName,
        type: damageType,
        measure: getMeasure(isRanged, role, skullIndex),
        attack: getAttackMod(isRanged, role, skullIndex),
        rangeIncrement: isRanged ? getRangeIncrement(isRanged, role, skullIndex) : null,
        damage: getDamage(isSpecial, isRanged, damageType, role, skullIndex),
        recovery: getRecovery(isRanged, role, skullIndex)
    }
}

