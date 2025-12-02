import { UpdateFunction } from "../../../../../hooks/updateUtilities/interfaces/updateInterfaces"

interface Props {
    currentSkullValue: number,
    updateSkull: UpdateFunction,
    keyValue: string
}

export default function SkullSelection({ currentSkullValue = 1, updateSkull, keyValue }: Props) {
    const skullArray = [
        ' ',
        '💀',
        '💀💀',
        '💀💀💀',
        '💀💀💀💀',
        '💀💀💀💀💀',
        '💀💀💀💀💀💀',
    ]
    return (
        <select onChange={event => updateSkull(keyValue, +event.target.value)} value={currentSkullValue}>
            {skullArray.map((skull, index) => <option key={index} value={index + 1}>{skull}</option>)}
        </select>
    )
}