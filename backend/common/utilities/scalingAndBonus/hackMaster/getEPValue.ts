export default function getEPValue(skullValue: number) {
    const skullToEPDictionary = [35, 280, 1015, 1525, 2035, 2540, 3050, 3555]

    return skullToEPDictionary[skullValue]
}