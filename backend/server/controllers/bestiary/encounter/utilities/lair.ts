import rollDice from "../../../../utilities/diceRoller";

export default function getDistanceFromLair(milesDice: string): number {
    const milesFromLair = rollDice(milesDice)
    if (milesFromLair >= 0) {
        return milesFromLair
    }
    return 0
}