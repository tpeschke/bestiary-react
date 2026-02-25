import { Custom, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { useState } from "react";
import Icon from "../../../../../../../../../../../components/icon/Icon";
import { UpdateFunction } from "../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";

interface Props {
    options: StrategicOptions,
    updateCombatInfo: UpdateFunction
}

export default function AddStrategicCustomsDisplay({ options, updateCombatInfo }: Props) {
    const { customs } = options

    function addCustoms() {
        const fullNewCustom = {
            ...newCustom
        }

        const alteredOptions = {
            ...options,
            customs: [...customs, fullNewCustom]
        }
        updateCombatInfo('options', alteredOptions)
        setNewCustom({ ...newCustomTemplate })
    }

    const newCustomTemplate: Custom = {
        id: 0,
        label: '',
        attack: '',
        defense: ''
    }

    const [newCustom, setNewCustom] = useState<Custom>({
        ...newCustomTemplate
    })

    return (
        <>
            <h3>Customs</h3>
            <ul>
                {customs.map(({id, label, attack, defense}) => {
                    return (
                        <li key={label + id + attack + defense}>{label}
                            <ul>
                                <li>Atk: {attack}</li>
                                <li>Def: {defense}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <span className='add-strategic-obstacles-shell'>
                <input placeholder="Custom Label" onChange={event => setNewCustom({
                    ...newCustom,
                    label: event.target.value
                })} />
                <input placeholder="Attack Emotion" onChange={event => setNewCustom({
                    ...newCustom,
                    attack: event.target.value
                })} />
                <input placeholder="Defense Emotion" onChange={event => setNewCustom({
                    ...newCustom,
                    defense: event.target.value
                })} />
                <button onClick={addCustoms}><Icon iconName='plus' tooltip='Add Custom' /></button>
            </span>
        </>
    )
} 