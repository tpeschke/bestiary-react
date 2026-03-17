import { SystemOption } from "../../interfaces/beast/beast"

export default function getSystemString (systemNumber?: 0 | 1 | 2): SystemOption {
    switch (systemNumber) {
        case 2:
            return 'HackMaster'
        default:
            return 'Bonfire'
    }
}