export const rollDice = function (diceString: string | number) {
    if (typeof (diceString) === 'number') {
        if (+diceString === 0) {
            return 0
        }
        return +Math.floor(Math.random() * Math.floor(diceString)) + 1
    } else {
        let diceExpressionArray: string[] = []
        let expressionValue: string = ""

        diceString.replace(/\s/g, '').split('').forEach((val, i, array) => {
            if (val === '-' || val === '+' || val === '*') {
                diceExpressionArray.push(expressionValue)
                if (i !== array.length - 1) {
                    diceExpressionArray.push(val)
                }
                expressionValue = ""
            }
            if (!isNaN(+val) || val === 'd' || val === "!") {
                val = val.replace(/!/i, "")
                expressionValue = expressionValue + val;
            }

            if (i === array.length - 1 && expressionValue !== '') {
                diceExpressionArray.push(expressionValue);
            }
        })

        diceExpressionArray = diceExpressionArray.map((expression: string) : string => {
            if (expression.includes('d')) {
                let splitVal = expression.split('d')
                let subtotal = 0

                if (splitVal[0] === "") { splitVal[0] = '1' }

                let x = 0;
                while (x < +splitVal[0]) {
                    subtotal += rollDice(+splitVal[1])
                    x++;
                }

                return `${subtotal}`
            }
            return ''
        })

        return eval(diceExpressionArray.join(""))
    }
}