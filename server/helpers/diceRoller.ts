// DON'T EXPOSE TO USERS DUE TO eval
export const rollDice = function (diceString: string | number): number {
    if (typeof (diceString) === 'number') {
        return getRandomValueByMaxNumber(diceString)
    } else {
        const diceExpressionArray: string[] = convertDiceStringToArray(diceString).map(parseAndRollExpression)
        return eval(diceExpressionArray.join(""))
    }
}

function getRandomValueByMaxNumber (maxValue: number): number {
    if (+maxValue === 0) {
        return 0
    }
    return Math.floor(Math.random() * Math.floor(maxValue)) + 1
}

function convertDiceStringToArray (diceString: string): string[] {
    let expressionValue: string = ""
    let diceExpressionArray: string[] = []

    diceString.split('').forEach((val: string, index: number, array: string[]) => {
        if (val === '-' || val === '+' || val === '*') {
            diceExpressionArray.push(expressionValue)
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
            diceExpressionArray.push(expressionValue);
        }
    })

    return diceExpressionArray
}

function parseAndRollExpression (expression: string): string {
    if (expression.includes('d')) {
        let splitVal : string[] = expression.split('d')
        let subtotal : number = 0

        if (splitVal[0] === "") { splitVal[0] = '1' }

        let x : number = 0;
        while (x < +splitVal[0]) {
            subtotal += rollDice(+splitVal[1])
            x++;
        }

        return `${subtotal}`
    }
    return ''
}