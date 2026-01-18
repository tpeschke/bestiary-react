import rollDice from "../../../../utilities/diceRoller";

export default function getTime(): string {
    const time = rollDice(8) / 2
    return `In ${time} Hour${time > 1 ? 's' : ''}`
}