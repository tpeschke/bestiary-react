export default function getEpIndex(epValue: number): number {
    const epValueIndexDictionary = [null, null, null, null, 10, 35, 70, 135, 170, 200, 245, 295, 350, 420, 495, 575, 675, 795, 925, 1075, 1245, 1425, 1625, 1845, 2075, 2325, 2595, 2880, 3180, 3500, 3835, 4185, 4555]

    return epValueIndexDictionary.indexOf(epValue)
}