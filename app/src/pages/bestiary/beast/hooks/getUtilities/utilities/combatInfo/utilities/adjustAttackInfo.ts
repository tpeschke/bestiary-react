import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { AttackStats } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { calculateHackMasterAttackInfo, calculateBonfireAttackInfo } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"

export default function adjustAttackInfo(skulls: number, roleID: string | null, role: string, size: Size, spells: Spell[], system: SystemOption) {
    return (attackInfo: AttackStats[], attack: AttackStats): AttackStats[] => {
        if (!roleID || attack.roleid === roleID) {
            if (attack.infoType === 'weapon' && system === 'HackMaster') {
                attackInfo.push({
                    ...attack,
                    ...calculateHackMasterAttackInfo(attack, skulls, role, attack.scalingInfo.addsizemod, size, null),
                    system: 'HackMaster',
                    weaponName: attack.weapon?.split(' (')[0]
                })
            } else if (attack.infoType === 'weapon' && system === "Bonfire") {
                attackInfo.push({
                    ...attack,
                    ...calculateBonfireAttackInfo(attack, skulls, role, attack.scalingInfo.addsizemod, size, null),
                    system: 'Bonfire',
                    weaponName: attack.weapon?.split(' (')[0]
                })
            } else if (attack.infoType === 'spell') {
                attackInfo.push({
                    ...attack,
                    spellInfo: spells.filter(spell => attack.spellid === spell.id)[0]
                })
            } else {
                attackInfo.push({ ...attack })
            }
        }
        return attackInfo
    }
}