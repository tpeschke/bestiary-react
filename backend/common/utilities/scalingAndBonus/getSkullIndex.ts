export default function getSkullIndex(skullValue: number): number {
    switch(skullValue) {
        case 8:
            return 14
        case 7:
            return 11
        case 6:
            return 10
        case 5:
            return 9
        case 4:
            return 8
        case 3:
            return 7
        case 2:
            return 6
        case 1:
        default:
            return 4 
    }
}