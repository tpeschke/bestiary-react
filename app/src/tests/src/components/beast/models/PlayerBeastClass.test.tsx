import '@testing-library/jest-dom'
import { getRandomNumber, getRandomString } from '../../../../utilities/randomGenerator';
import { PlayerBeastInfo } from '../../../../../pages/bestiary/beast/interfaces/viewInterfaces';
import PlayerBeastClass from '../../../../../pages/bestiary/beast/models/PlayerBeastClass';

describe('Blank PlayerBeastClass', () => {
    const emptyTestClass: PlayerBeastInfo = {
        id: 0,
        name: '',
        notes: {
            notes: ''
        },
        artistInfo: {}
    }
    let testClass = new PlayerBeastClass(emptyTestClass)

    test('Returns id', () => {
        expect(testClass.id).toBe(0)
    })

    test('Returns name', () => {
        expect(testClass.name).toBe('')
    })

    test('Returns notes', () => {
        expect(testClass.notes.id).toBe(undefined)
        expect(testClass.notes.notes).toBe('')
    })

    test('Returns artist info', () => {
        expect(testClass.artistInfo.id).toBe(undefined)
        expect(testClass.artistInfo.artistid).toBe(undefined)
        expect(testClass.artistInfo.artist).toBe(undefined)
        expect(testClass.artistInfo.tooltip).toBe(undefined)
        expect(testClass.artistInfo.link).toBe(undefined)
        expect(testClass.artistInfo.roleid).toBe(undefined)
    })

    test('Returns all info', () => {
        const returnedInfo = testClass.info

        expect(returnedInfo.id).toBe(0)
        expect(returnedInfo.name).toBe('')

        expect(returnedInfo.notes.id).toBe(undefined)
        expect(returnedInfo.notes.notes).toBe('')

        expect(testClass.artistInfo.id).toBe(undefined)
        expect(testClass.artistInfo.artistid).toBe(undefined)
        expect(testClass.artistInfo.tooltip).toBe(undefined)
        expect(testClass.artistInfo.link).toBe(undefined)
        expect(testClass.artistInfo.roleid).toBe(undefined)
    })
})

describe('PlayerBeastClass', () => {
    const expectedId = getRandomNumber()
    const expectedName = getRandomString()

    const expectedNotesId = getRandomNumber()
    const expectedNotes = getRandomString()

    const expectedArtistDBId = getRandomNumber()
    const expectedArtistId = getRandomNumber()
    const expectedArtist = getRandomString()
    const expectedTooltip = getRandomString()
    const expectedLink = getRandomString()
    const expectedRoleId = getRandomString()

    const emptyTestClass: PlayerBeastInfo = {
        id: expectedId,
        name: expectedName,
        notes: {
            id: expectedNotesId,
            notes: expectedNotes
        },
        artistInfo: {
            id: expectedArtistDBId,
            artistid: expectedArtistId,
            artist: expectedArtist,
            tooltip: expectedTooltip,
            link: expectedLink,
            roleid: expectedRoleId
        }
    }
    let testClass = new PlayerBeastClass(emptyTestClass)

    beforeAll(() => {
        jest.spyOn(PlayerBeastClass.prototype as any, 'saveNotes').mockImplementation(() => { });
    });

    test('Gets id', () => {
        expect(testClass.id).toBe(expectedId)
    })

    test('Gets name', () => {
        expect(testClass.name).toBe(expectedName)
    })

    test('Returns artist info', () => {
        expect(testClass.artistInfo.id).toBe(expectedArtistDBId)
        expect(testClass.artistInfo.artistid).toBe(expectedArtistId)
        expect(testClass.artistInfo.artist).toBe(expectedArtist)
        expect(testClass.artistInfo.tooltip).toBe(expectedTooltip)
        expect(testClass.artistInfo.link).toBe(expectedLink)
        expect(testClass.artistInfo.roleid).toBe(expectedRoleId)
    })

    test('Gets notes', () => {
        expect(testClass.notes.id).toBe(expectedNotesId)
        expect(testClass.notes.notes).toBe(expectedNotes)
    })

    test('Gets all info', () => {
        const returnedInfo = testClass.info

        expect(returnedInfo.id).toBe(expectedId)
        expect(returnedInfo.name).toBe(expectedName)

        expect(returnedInfo.notes.id).toBe(expectedNotesId)
        expect(returnedInfo.notes.notes).toBe(expectedNotes)

        expect(testClass.artistInfo.id).toBe(expectedArtistDBId)
        expect(testClass.artistInfo.artistid).toBe(expectedArtistId)
        expect(testClass.artistInfo.artist).toBe(expectedArtist)
        expect(testClass.artistInfo.tooltip).toBe(expectedTooltip)
        expect(testClass.artistInfo.link).toBe(expectedLink)
        expect(testClass.artistInfo.roleid).toBe(expectedRoleId)
    })

    test('Set Notes', () => {
        const newExpectedNotes = getRandomString()

        testClass.setNotes(newExpectedNotes)

        expect(testClass.notes.id).toBe(expectedNotesId)
        expect(testClass.notes.notes).toBe(newExpectedNotes)
    })

})