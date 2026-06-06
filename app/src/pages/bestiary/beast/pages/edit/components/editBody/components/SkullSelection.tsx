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
            10,
            35,
            70,
            140
        ],
        [
            280,
            560,
            765,
            890
        ],
        [
            1015,
            1145,
            1270,
            1400
        ],
        [
            1525,
            1650,
            1780,
            1905
        ],
        [
            2035,
            2160,
            2285,
            2415
        ],
        [
            2540,
            2665,
            2795,
            2920
        ],
        [
            3050,
            3175,
            3300,
            3430
        ],
        [
            3555
        ],
    ]

    const epArray = [
        ...epArrayBySkull[currentSkullValue ? currentSkullValue : 0],
        10,
        35,
        70,
        140,
        280,
        560,
        765,
        890,
        1015,
        1145,
        1270,
        1400,
        1525,
        1650,
        1780,
        1905,
        2035,
        2160,
        2285,
        2415,
        2540,
        2665,
        2795,
        2920,
        3050,
        3175,
        3300,
        3430,
        3555
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