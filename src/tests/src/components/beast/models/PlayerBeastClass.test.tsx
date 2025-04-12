import '@testing-library/jest-dom'
import PlayerBeastClass from '../../../../../components/beast/models/PlayerBeastClass';
import { PlayerBeastInfo } from '../../../../../components/beast/interfaces/viewInterfaces';
import { getRandomNumber, getRandomString } from '../../../../utilities/randomGenerator';

describe('Blank PlayerBeastClass', () => {
    const emptyTestClass: PlayerBeastInfo = {
        id: 0,
        name: '',
        notes: {
            notes: ''
        }
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

    test('Returns all info', () => {
        const returnedInfo = testClass.info

        expect(returnedInfo.id).toBe(0)
        expect(returnedInfo.name).toBe('')
        expect(returnedInfo.notes.id).toBe(undefined)
        expect(returnedInfo.notes.notes).toBe('')
    })
})

describe('PlayerBeastClass', () => {
    const expectedId = getRandomNumber()
    const expectedName = getRandomString()
    const expectedNotesId = getRandomNumber()
    const expectedNotes = getRandomString()

    const emptyTestClass: PlayerBeastInfo = {
        id: expectedId,
        name: expectedName,
        notes: {
            id: expectedNotesId,
            notes: expectedNotes
        }
    }
    let testClass = new PlayerBeastClass(emptyTestClass)

    beforeAll(() => {
        jest.spyOn(PlayerBeastClass.prototype as any, 'saveNotes').mockImplementation(() => {});
    });

    test('Gets id', () => {
        expect(testClass.id).toBe(expectedId)
    })

    test('Gets name', () => {
        expect(testClass.name).toBe(expectedName)
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
    })

    test('Set Notes', () => {
        const newExpectedNotes = getRandomString()

        testClass.setNotes(newExpectedNotes)
        
        expect(testClass.notes.id).toBe(expectedNotesId)
        expect(testClass.notes.notes).toBe(newExpectedNotes)
    })

})