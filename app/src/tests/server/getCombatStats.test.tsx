import { RawCombatStat } from "../../../../backend/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Strength } from "../../../../backend/common/interfaces/calculationInterfaces"
import { getCombatStats } from "../../../../backend/server/controllers/bestiary/gameMaster/utilities/getUtilities/utilities/combatInfo/weaponInfo/getCombatInfo"
import { getMonsterAttacks } from "../../../../backend/server/db/beast/attacks"
import { getMonsterCombatStats } from "../../../../backend/server/db/beast/combatStat"
import { getMonsterDefenses } from "../../../../backend/server/db/beast/defenses"

const strength: Strength = 'none'

function rawCombatStat(overrides: Partial<RawCombatStat> = {}): RawCombatStat {
    return {
        id: 1,
        oldid: 1,
        attackid: undefined,
        defenseid: undefined,
        reference: undefined,
        defensename: undefined,
        attackrole: null,
        situation: undefined,
        tactic: undefined,
        beastid: 42,
        roleid: 'role-1',
        combatpoints: 0,
        role: 'Brute',
        piercingweapons: null,
        slashingweapons: strength,
        crushingweapons: null,
        damagetype: 'S',
        weaponsmallpiercing: null,
        weaponsmallslashing: null,
        weaponsmallcrushing: null,
        andslashing: null,
        andcrushing: null,
        flanks: null,
        rangeddefense: null,
        alldefense: null,
        allaround: '',
        attack: null,
        isspecial: 'no',
        eua: false,
        addsizemod: false,
        weapon: 'claws',
        shield: '',
        armor: '',
        weaponname: 'Claws',
        initiative: null,
        measure: null,
        recovery: null,
        showonlydefenses: false,
        weapontype: 'm',
        rangedistance: null,
        swarmbonus: false,
        adjustment: 0,
        tdr: false,
        info: null,
        info_hm: null,
        attackinfo: null,
        attackinfo_hm: null,
        spellid: '',
        dradjust: 0,
        ...overrides
    }
}

test('falls back to legacy combat stat attacks when migrated defenses have no attack rows', async () => {
    const defenseRow = rawCombatStat({
        id: 7001,
        oldid: 3001,
        defensename: 'Scaly hide',
        weaponname: 'Scaly hide',
        weapon: '',
        showonlydefenses: true
    })
    const legacyAttackRow = rawCombatStat({
        id: 3002,
        oldid: 3002,
        attackid: 9001,
        weaponname: 'Legacy claws',
        weapon: 'claws',
        showonlydefenses: false
    })
    const combatInfoQuery = async (text: string): Promise<RawCombatStat[]> => {
        if (text === getMonsterDefenses) {
            return [defenseRow]
        }
        if (text === getMonsterAttacks) {
            return []
        }
        if (text === getMonsterCombatStats) {
            return [legacyAttackRow]
        }

        throw new Error(`Unexpected query: ${text}`)
    }

    const combatStats = await getCombatStats(42, 4, 'Brute', 'Medium', undefined, combatInfoQuery)

    expect(combatStats.defenses).toHaveLength(1)
    expect(combatStats.defenses[0]).toMatchObject({
        id: 7001,
        defensename: 'Scaly hide'
    })
    expect(combatStats.attacks).toHaveLength(1)
    expect(combatStats.attacks[0]).toMatchObject({
        id: 9001,
        infoType: 'weapon',
        name: 'Legacy claws'
    })
})
