import { Size } from "../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

export default function calculateKnockBack(knockBack: number | null, size: Size) {
    if (knockBack) {
        return knockBack
    }

    const knockBackSizeDictionary = {
        'Fine': 1,
        'Diminutive': 3,
        'Tiny': 5,
        'Small': 10,
        'Medium': 15,
        'Large': 20,
        'Huge': 25,
        'Giant': 30,
        'Enormous': 35,
        'Colossal': 40
    }

    return knockBackSizeDictionary[size]
}