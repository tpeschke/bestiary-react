import { SystemOption } from "../../interfaces/beast/beast"

export const BONFIRE = 0
export const DND = 1
export const HACKMASTER = 2

export default function getSystemString (systemNumber?: 0 | 1 | 2): SystemOption {
    switch (systemNumber) {
        case HACKMASTER:
            return 'HackMaster'
        default:
            return 'Bonfire'
    }
}