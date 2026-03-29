
export default function getBaseEPValue(skullValue: number): number {
    const skullToEPDictionary: number[] = [10, 280, 1015, 1525, 2035, 2540, 3050, 3555]
    return skullToEPDictionary[skullValue]
}