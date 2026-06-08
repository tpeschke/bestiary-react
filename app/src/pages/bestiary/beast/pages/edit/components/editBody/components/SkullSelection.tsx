import { UpdateFunction } from "../../../../../hooks/updateUtilities/interfaces/updateInterfaces"

interface Props {
    currentSkullValue?: number,
    currentEPValue?: number,
    updateSkull: UpdateFunction,
    skullKeyValue?: string,
    epKeyValue?: string
}

export default function SkullSelection({ currentSkullValue, currentEPValue, updateSkull, skullKeyValue, epKeyValue }: Props) {
    const skullArray = [
        ' ',                // Untrained
        '💀',               // Novice
        '💀💀',             // Journeyman
        '💀💀💀',           // Expert
        '💀💀💀💀',         // Master
        '💀💀💀💀💀',       // GrandMaster
        '💀💀💀💀💀💀',     // Legendary
        '💀💀💀💀💀💀💀',     // Mythic
    ]

    const epArrayBySkull: number[][] = [
        [
            10, 35, 70, 135
        ],
        [
            170, 200, 245, 295
        ],
        [
            350, 420, 495, 575

        ],
        [
            675, 795, 925, 1075
        ],
        [
            1245, 1425, 1625, 1845

        ],
        [
            2075, 2325, 2595, 2880

        ],
        [
            3180, 3500, 3835, 4185

        ],
        [
            4555
        ],
    ]

    const epArray = [
        ...epArrayBySkull[currentSkullValue ? currentSkullValue : 0],
        10, 35, 70, 135, 170, 200, 245, 295, 350, 420, 495, 575, 675, 795, 925, 1075, 1245, 1425, 1625, 1845, 2075, 2325, 2595, 2880, 3180, 3500, 3835, 4185, 4555
    ]

    return (
        <div>
            {(currentSkullValue && skullKeyValue) && <select
                onClick={event => event.stopPropagation()}
                onChange={event => updateSkull(skullKeyValue, +event.target.value)}
                value={currentSkullValue}
            >
                {skullArray.map((skull, index) => <option key={index} value={index}>{skull}</option>)}
            </select>}

            {(currentEPValue && epKeyValue) && <select
                onClick={event => event.stopPropagation()}
                onChange={event => updateSkull(epKeyValue, +event.target.value)}
                value={currentEPValue}
            >
                {epArray.map((ep, index) => <option key={index} value={ep}>{ep}</option>)}
            </select>}
        </div>
    )
}