import { OtherStrategicOption, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { useState } from "react";
import Icon from "../../../../../../../../../../../components/icon/Icon";
import { UpdateFunction } from "../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";

interface Props {
    options: StrategicOptions,
    updateCombatInfo: UpdateFunction
}

export default function AddStrategicOtherDisplay({ options, updateCombatInfo }: Props) {
    const { other } = options

    function addOther() {
        const fullNewCustom = {
            ...newCustom
        }

        const alteredOptions = {
            ...options,
            other: [...other, fullNewCustom]
        }
        updateCombatInfo('options', alteredOptions)
        setNewOther({ ...newCustomTemplate })
    }

    const newCustomTemplate: OtherStrategicOption = {
        id: 0,
        label: '',
        tooltip: null,
    }

    const [newCustom, setNewOther] = useState<OtherStrategicOption>({
        ...newCustomTemplate
    })

    return (
        <>
            <h3>Other</h3>
            <ul>
                {other.map(({id, label, tooltip}) => {
                    return (
                        <li key={label + id}>{label} {tooltip && `(${tooltip})`}</li>
                    )
                })}
            </ul>
            <span className='add-strategic-obstacles-shell'>
                <input placeholder="Other Label" onChange={event => setNewOther({
                    ...newCustom,
                    label: event.target.value
                })} />
                <input placeholder="Tooltip" onChange={event => setNewOther({
                    ...newCustom,
                    tooltip: event.target.value
                })} />
                <button onClick={addOther}><Icon iconName='plus' tooltip='Add Custom' /></button>
            </span>
        </>
    )
} 