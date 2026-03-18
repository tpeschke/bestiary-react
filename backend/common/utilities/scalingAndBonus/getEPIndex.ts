export default function getEpIndex(epValue: number): number {
    const epValueIndexDictionary = [ null, null, null, null, 10, 35, 70, 140, 280, 560, 765, 890, 1015, 1145, 1270, 1400, 1525, 1650, 1780, 1905, 2035, 2160, 2285, 2415, 2540, 2665, 2795, 2920, 3050, 3175, 3300, 3430, 3555]

    return epValueIndexDictionary.indexOf(epValue)
}