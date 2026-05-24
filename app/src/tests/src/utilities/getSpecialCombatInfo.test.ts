import { buildSpecialCombatInfo, getBonfireSpecialCombatInfo, getHackMasterSpecialCombatInfo, getSpecialCombatInfo } from '@bestiary/common/utilities/get/getSpecialCombatInfo'

describe('special combat info system variants', () => {
    test('builds original, empty 5.5e, and HackMaster text slots', () => {
        const bonfireInfo = [
            'On a Trauma Check, the target is Trauma’d.',
            'Vitality And Stress Stress Fatigue Endurance.',
            'Parries an attack in a Confrontation with Mem and +2 Pos.',
            'Roll d8!, take 2 Wear, then Wear and Recovery.'
        ].join(' ')

        const variants = buildSpecialCombatInfo(bonfireInfo)

        expect(variants).toEqual([
            bonfireInfo,
            undefined,
            "When ToP'd, the target is ToP'd. HP  HP Damage HP. dodges an attack by 5 or more in a  with Int and +4. Roll d8p, take -2, then Penalty and Speed."
        ])
    })

    test('reads the matching system slot and falls back to original strings', () => {
        const variants = buildSpecialCombatInfo('On Trauma Check: 3 Wear')

        expect(getSpecialCombatInfo(variants, 'Bonfire')).toBe('On Trauma Check: 3 Wear')
        expect(getSpecialCombatInfo(variants, 'HackMaster')).toBe("When ToP'd: -3")
        expect(getSpecialCombatInfo('plain text', 'HackMaster')).toBe('plain text')
        expect(getBonfireSpecialCombatInfo(variants)).toBe('On Trauma Check: 3 Wear')
    })

    test('converts curly and straight Trauma apostrophes', () => {
        expect(getHackMasterSpecialCombatInfo("Trauma'd Trauma’d")).toBe("ToP'd ToP'd")
    })
})
