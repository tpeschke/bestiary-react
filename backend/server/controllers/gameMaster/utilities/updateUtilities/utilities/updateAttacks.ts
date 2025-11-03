import { AttackInfo, AttackReference, WeaponInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../db/database"
import { addReferenceToDB, addWeaponToDB, removeMissingAttackIDsFromDB, updateReferenceInfo, updateWeaponInfo } from "../../../../../db/beast/attacks"

export default async function updateAttacks(attacks: AttackInfo[], beastID: number) {
    let promiseArray: any[] = []

    await query(removeMissingAttackIDsFromDB, [beastID, [0, ...attacks.map(attack => attack.id)]])

    attacks.forEach(attack => {
        if (attack.infoType === 'weapon') {
            promiseArray.push(upsertWeaponAttack(attack, beastID))
        } else if (attack.infoType === 'reference') {
            promiseArray.push(upsertReferenceAttack(attack, beastID))
        }
    })

    return Promise.all(promiseArray)
}

async function upsertWeaponAttack (attack: WeaponInfo, beastID: number) {
    const { overAllIndex, oldID, id, situation, tactic, roleid } = attack
    if (id) {
        return query(updateWeaponInfo, [id, oldID, overAllIndex, situation, tactic, beastID])
    } else {
        return query(addWeaponToDB, [oldID, overAllIndex, situation, tactic, roleid, beastID])
    }
}

async function upsertReferenceAttack(attack: AttackReference, beastID: number) {
    const { id, overAllIndex, reference, tactic, roleid, situation } = attack
    if (id) {
        return query(updateReferenceInfo, [id, overAllIndex, reference, tactic, situation, beastID])
    } else {
        return query(addReferenceToDB, [overAllIndex, reference, tactic, situation, roleid, beastID])
    }
}