/**
 * DON'T EXPOSE TO USERS
 * due to eval
 */
export default function rollDice(diceString: string | number = 0): number {
    if (typeof (diceString) === 'number') {
        return getRandomValueByMaxNumber(diceString)
    } else {
        const diceExpressionArray: (string | number)[] = convertDiceStringToArray(diceString).map(parseAndRollAnyDice)
        const total : number = eval(diceExpressionArray.join(""))
        if (total) {
            return total
        }
        return 0
    }
}

export function getRandomValueByMaxNumber(maxValue: number): number {
    if (maxValue === 0) {
        return 0
    }
    return Math.floor(Math.random() * Math.floor(maxValue)) + 1
}

export function convertDiceStringToArray(diceString: string): string[] {
    let expressionValue: string = ""
    let diceExpressionArray: string[] = []

    function pushExpression(expressionValue: string): void {
        if (expressionValue !== 'd') {
            diceExpressionArray.push(expressionValue)
        }
    }

    diceString.replace(/\s/g, '').split('').forEach((val: string, index: number, array: string[]) => {
        if (val === '-' || val === '+' || val === '*') {
            pushExpression(expressionValue)
            if (index < array.length) {
                diceExpressionArray.push(val)
            }
            expressionValue = ""
        }
        if (!isNaN(+val) || val === 'd' || val === "!") {
            val = val.replace(/!/i, "")
            expressionValue = expressionValue + val;
        }

        if (index === array.length - 1 && expressionValue !== '') {
            pushExpression(expressionValue)
        }
    })

    return diceExpressionArray
}

export function parseAndRollAnyDice(expression: string): string | number {
    if (expression.includes('d')) {
        let splitVal: string[] = expression.split('d')
        let subtotal: number = 0

        if (splitVal[0] === "") { splitVal[0] = '1' }

        let x: number = 0;
        while (x < +splitVal[0]) {
            subtotal += rollDice(+splitVal[1])
            x++;
        }

        return subtotal
    } else if (expression.match(/\+|-|\*|\/|[1-9]/)) {
        return expression
    }
    return ''
}