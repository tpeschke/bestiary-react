export default function getSkullNumber(points: number): number {
    if (points <= 3) {
        return 0
    } else if (points <= 8) {
        return 1
    } else if (points <= 13) {
        return 2
    } else if (points <= 18) {
        return 3
    } else if (points <= 23) {
        return 4
    } else if (points <= 28) {
        return 5
    } else if (points <= 33) {
        return 6
    } else {
        return 7
    }
}