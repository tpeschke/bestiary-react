import { getBonfireSystemInfo, getSystemInfoText, hasSystemInfoContent, updateBonfireSystemInfo } from "@bestiary/common/utilities/get/getSystemInfo"
import { SystemInfoArray } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

describe('getSystemInfoText', () => {
    const info: SystemInfoArray = [
        '<p>On a Trauma Check, take 2 Wear.</p>',
        undefined,
        "<p>When ToP'd, take -2.</p>"
    ]

    test('returns Bonfire text for Bonfire preferences', () => {
        expect(getSystemInfoText(info, 0)).toBe('<p>On a Trauma Check, take 2 Wear.</p>')
        expect(getSystemInfoText(info, 'Bonfire')).toBe('<p>On a Trauma Check, take 2 Wear.</p>')
    })

    test('returns HackMaster text for HackMaster preferences', () => {
        expect(getSystemInfoText(info, 2)).toBe("<p>When ToP'd, take -2.</p>")
        expect(getSystemInfoText(info, 'HackMaster')).toBe("<p>When ToP'd, take -2.</p>")
    })

    test('falls back to Bonfire text when a system slot is empty', () => {
        expect(getSystemInfoText(info, 1)).toBe('<p>On a Trauma Check, take 2 Wear.</p>')
    })

    test('returns plain string and empty values unchanged', () => {
        expect(getSystemInfoText('<p>Plain</p>', 2)).toBe('<p>Plain</p>')
        expect(getSystemInfoText(null, 2)).toBe('')
        expect(getSystemInfoText(undefined, 2)).toBe('')
    })
})

describe('system info helpers', () => {
    test('reads and updates the canonical Bonfire slot', () => {
        const info: SystemInfoArray = ['<p>Old</p>', undefined, '<p>Old HackMaster</p>']
        const updatedInfo = updateBonfireSystemInfo(info, '<p>New</p>') as SystemInfoArray

        expect(getBonfireSystemInfo(updatedInfo)).toBe('<p>New</p>')
        expect(getSystemInfoText(updatedInfo, 2)).toBe('<p>Old HackMaster</p>')
    })

    test('detects content after resolving the selected system', () => {
        expect(hasSystemInfoContent(['', undefined, '<p>HackMaster</p>'], 0)).toBe(false)
        expect(hasSystemInfoContent(['', undefined, '<p>HackMaster</p>'], 2)).toBe(true)
    })
})
