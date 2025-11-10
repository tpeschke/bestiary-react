import { UpdateFunction } from "../../../../../hooks/beastHooks"

interface Props {
    currentSkullValue: number,
    updateSkull: UpdateFunction,
    keyValue: string
}

export default function SkullSelection({ currentSkullValue = 1, updateSkull, keyValue }: Props) {
    const skullArray = [
        '💀',
        '💀💀',
        '💀💀💀',
        '💀💀💀💀',
        '💀💀💀💀💀',
        '💀💀💀💀💀💀',
        '💀💀💀💀💀💀💀'
    ]
    return (
        <select onChange={event => updateSkull(keyValue, +event.target.value)} value={currentSkullValue}>
            {skullArray.map((skull, index) => <option value={index + 1}>{skull}</option>)}
        </select>
    )
}