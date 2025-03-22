import '@testing-library/jest-dom'
import rollDice, { getRandomValueByMaxNumber, convertDiceStringToArray, parseAndRollAnyDice } from '../../../../server/utilities/diceRoller'

describe('getRandomValueByMaxNumber', () => {
    test('Returns 0', () => {
        const valueToTest : number = 0
        expect(getRandomValueByMaxNumber(valueToTest)).toBe(valueToTest)
    })

    test('Returns 1', () => {
        const valueToTest : number = 1
        expect(getRandomValueByMaxNumber(valueToTest)).toBe(valueToTest)
    })

    test('Returns a number equal to or less', () => {
        const valueToTest : number = 3
        for (let i = 1; i < 9; i++) {
            const generatedValue : number = getRandomValueByMaxNumber(valueToTest)
            expect(generatedValue).toBeLessThanOrEqual(generatedValue)
            expect(generatedValue).toBeGreaterThanOrEqual(1)
        }
    })
})

describe('convertDiceStringToArray', () => {
    test('Single die with no starting number', () => {
        expect(convertDiceStringToArray('d4')).toStrictEqual(['d4'])
    })

    test('Multi-die string', () => {
        expect(convertDiceStringToArray('4d4')).toStrictEqual(['4d4'])
    })

    test('Explosion string', () => {
        expect(convertDiceStringToArray('1d4!')).toStrictEqual(['1d4'])
    })

    test('Modifier', () => {
        expect(convertDiceStringToArray('3d6+4')).toStrictEqual(['3d6', '+', '4'])
    })

    test('Two digit die', () => {
        expect(convertDiceStringToArray('1d12')).toStrictEqual(['1d12'])
    })

    test('Two digit die with explosion', () => {
        expect(convertDiceStringToArray('2d20!')).toStrictEqual(['2d20'])
    })

    test('Multiple die types', () => {
        expect(convertDiceStringToArray('5d6+2d8')).toStrictEqual(['5d6', '+', '2d8'])
    })

    test('Just modifier', () => {
        expect(convertDiceStringToArray('5')).toStrictEqual(['5'])
    })

    test('Multiplication modifier', () => {
        expect(convertDiceStringToArray('d8*2')).toStrictEqual(['d8', '*', '2'])
    })

    test('With spaces', () => {
        expect(convertDiceStringToArray('2 d 8      ! + 9')).toStrictEqual(['2d8', '+', '9'])
    })

    test('Single d', () => {
        expect(convertDiceStringToArray('d')).toStrictEqual([])
    })

    test('Random letter', () => {
        expect(convertDiceStringToArray('K')).toStrictEqual([])
    })

    test('Strange Character', () => {
        expect(convertDiceStringToArray(']')).toStrictEqual([])
    })

    test('Boolean in string', () => {
        expect(convertDiceStringToArray('false')).toStrictEqual([])
    })
})

describe('parseAndRollAnyDice', () => {
    test('Single die with no starting number', () => {
        const generatedValue: string | number = parseAndRollAnyDice('d4')
        for (let i = 1; i < 12; i++) {
            expect(generatedValue).toBeLessThanOrEqual(4)
            expect(generatedValue).toBeGreaterThanOrEqual(1)
        }
    })

    test('Multi-die string', () => {
        const generatedValue: string | number = parseAndRollAnyDice('6d1')
        expect(generatedValue).toBe(6)
    })

    test('Multi-die string with bigger die', () => {
        const generatedValue: string | number = parseAndRollAnyDice('2d4')
        expect(generatedValue).toBeLessThanOrEqual(8)
        expect(generatedValue).toBeGreaterThanOrEqual(2)
    })

    test('Modifier +', () => {
        const valueToTest : string = '+'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Modifier -', () => {
        const valueToTest : string = '-'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Modifier *', () => {
        const valueToTest : string = '*'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Modifier /', () => {
        const valueToTest : string = '/'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Bad Modifier (%)', () => {
        expect(parseAndRollAnyDice('%')).toBe('')
    })

    test('Just modifier', () => {
        const valueToTest : string = '5'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Just negative modifier', () => {
        const valueToTest : string = '-12'
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })

    test('Blank string', () => {
        const valueToTest : string = ''
        expect(parseAndRollAnyDice(valueToTest)).toBe(valueToTest)
    })
})

describe('rollDice', () => { 
    test('Single die with no starting number', () => {
        const generatedValue : number = rollDice('d3')
        expect(generatedValue).toBeLessThanOrEqual(3)
        expect(generatedValue).toBeGreaterThanOrEqual(1)
    })

    test('Multi-die string', () => {
        const generatedValue: number = rollDice('5d1')
        expect(generatedValue).toBe(5)
    })

    test('Multi-die string with larger dice', () => {
        const generatedValue : number = rollDice('2d3')
        expect(generatedValue).toBeLessThanOrEqual(6)
        expect(generatedValue).toBeGreaterThanOrEqual(2)
    })

    test('Explosion string', () => {
        const generatedValue : number = rollDice('1d3!')
        expect(generatedValue).toBeLessThanOrEqual(3)
        expect(generatedValue).toBeGreaterThanOrEqual(1)
    })

    test('Modifier', () => {
        const generatedValue : number = rollDice('1d6+4')
        expect(generatedValue).toBeLessThanOrEqual(10)
        expect(generatedValue).toBeGreaterThanOrEqual(5)
    })

    test('Two digit die', () => {
        const generatedValue : number = rollDice('1d10')
        expect(generatedValue).toBeLessThanOrEqual(10)
        expect(generatedValue).toBeGreaterThanOrEqual(1)
    })

    test('Two digit die with explosion', () => {
        const generatedValue : number = rollDice('2d10!')
        expect(generatedValue).toBeLessThanOrEqual(20)
        expect(generatedValue).toBeGreaterThanOrEqual(2)
    })

    test('Multiple die types', () => {
        const generatedValue : number = rollDice('1d3+2d2')
        expect(generatedValue).toBeLessThanOrEqual(7)
        expect(generatedValue).toBeGreaterThanOrEqual(3)
    })

    test('Just number in string', () => {
        const generatedValue: number = rollDice('5')
        expect(generatedValue).toBe(5)
    })

    test('Just number as number', () => {
        const generatedValue: number = rollDice(4)
        expect(generatedValue).toBeLessThanOrEqual(4)
        expect(generatedValue).toBeGreaterThanOrEqual(1)
    })

    test('Multiplication modifier', () => {
        const generatedValue: number = rollDice('d2*2')
        expect(generatedValue).toBeLessThanOrEqual(4)
        expect(generatedValue).toBeGreaterThanOrEqual(2)
    })

    test('With spaces', () => {
        const generatedValue: number = rollDice('2      d3     + 1')
        expect(generatedValue).toBeLessThanOrEqual(7)
        expect(generatedValue).toBeGreaterThanOrEqual(3)
    })

    test('Single d', () => {
        expect(rollDice('d')).toBe(0)
    })

    test('Random letter', () => {
        expect(rollDice('K')).toBe(0)
    })
    
    test('Strange Character', () => {
        expect(rollDice(']')).toBe(0)
    })

    test('Random sentnece', () => {
        expect(rollDice('I would prefer if you didnt use this string')).toBe(0)
    })

    test('Boolean in string', () => {
        expect(rollDice('false')).toBe(0)
    })
})