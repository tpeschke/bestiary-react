import { AttackInfo, AttackReference, WeaponInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateAttacks(databaseConnection: any, attacks: AttackInfo[], beastID: number) {
    let promiseArray: any[] = []

    attacks.forEach(attack => {
        if (attack.infoType === 'weapon') {
            promiseArray.push(upsertWeaponAttack(databaseConnection, attack, beastID))
        } else if (attack.infoType === 'reference') {
            promiseArray.push(upsertReferenceAttack(databaseConnection, attack, beastID))
        }
    })

    return Promise.all(promiseArray)
}

async function upsertWeaponAttack (databaseConnection: any, attack: WeaponInfo, beastID: number) {
    const { overAllIndex, oldID, id, situation, tactic, roleid } = attack
    if (id) {
        return databaseConnection.beast.attacks.updateWeapon(id, oldID, overAllIndex, situation, tactic, beastID)
    } else {
        return databaseConnection.beast.attacks.addWeapon(oldID, overAllIndex, situation, tactic, roleid, beastID)
    }
}

async function upsertReferenceAttack(databaseConnection: any, attack: AttackReference, beastID: number) {
    console.log(attack)
    const { id, overAllIndex, reference, tactic, roleid } = attack
    if (id) {
        return databaseConnection.beast.attacks.updateReference(id, overAllIndex, reference, tactic, beastID)
    } else {
        return databaseConnection.beast.attacks.addReference( overAllIndex, reference, tactic, roleid, beastID)
    }
}