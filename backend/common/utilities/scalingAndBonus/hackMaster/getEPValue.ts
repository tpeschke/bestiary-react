
export default function getBaseEPValue(skullValue: number): number {
    const skullToEPDictionary: number[] = [10, 170, 350, 675, 1245, 2075, 3180, 4555]
    return skullToEPDictionary[skullValue]
}