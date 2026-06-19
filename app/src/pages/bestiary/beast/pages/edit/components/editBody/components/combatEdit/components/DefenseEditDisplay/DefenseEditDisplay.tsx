import './DefenseEditDisplay.css'
import { DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Icon from "../../../../../../../../../../../components/icon/Icon"
import Body from "../../../../../../../../components/UI/body/Body"
import MoveOrderButton from "../AttacksEditDisplay/components/MoveOrderButton"
import { UpdateAttackDefenseStatsFunction, UpdateOrderFunction, RemoveCombatFunction, UpdateFunction, AddCombatFunction } from '../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'
import DefenseInfoEdit from '../../../components/info/DefenseInfoEdit'
import { SystemInfoValue } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'

interface Props {
    defenses: DefenseInfo[],
    defenseInfo: SystemInfoValue,
    roleDefenseInfo?: SystemInfoValue,
    updateNonRoleInfo: UpdateFunction,
    updateCombatInfo: UpdateFunction,
    updateDefenseInfo: UpdateAttackDefenseStatsFunction,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
    addDefense: AddCombatFunction
}

export default function DefenseEditDisplay({
    defenses,
    defenseInfo,
    roleDefenseInfo,
    updateNonRoleInfo,
    updateCombatInfo,
    updateDefenseOrder,
    removeDefense,
    updateDefenseInfo,
    addDefense
}: Props) {
    return (
        <Body>
            <h2 className="border">Defenses</h2>

            <DefenseInfoEdit
                defenseInfo={defenseInfo}
                roleDefenseInfo={roleDefenseInfo}
                updateDefenseInfo={updateNonRoleInfo}
                updateCombatInfo={updateCombatInfo}
                noHeader={true}
            />
            <br />

            <div className="defense-edit-header">
                <div></div>
                <p>Name</p>
            </div>
            <>
                {defenses.map((attack: DefenseInfo, index: number) => {
                    const nextUp = defenses[index - 1]?.overAllIndex
                    const nextDown = defenses[index + 1]?.overAllIndex
                    return DefenseEdit(attack, index, defenses.length, nextUp, nextDown, updateDefenseOrder, removeDefense, updateDefenseInfo)
                })}
            </>
            <div className="defense-add-row">
                <button onClick={_ => addDefense(defenses[defenses.length - 1])}>
                    <Icon iconName='plus' /> Defense
                </button>
            </div>
        </Body>
    )
}

function DefenseEdit(
    { id, overAllIndex, defensename, armor, shield }: DefenseInfo,
    index: number,
    arrayLength: number,
    nextUp: number,
    nextDown: number,
    updateDefenseOrder: UpdateOrderFunction,
    removeDefense: RemoveCombatFunction,
    updateDefenseInfo: UpdateAttackDefenseStatsFunction
) {
    return (
        <div key={index} className="defense-edit-row-shell">
            {MoveOrderButton(index > 0, 'up', updateDefenseOrder, overAllIndex, nextUp)}
            {MoveOrderButton(index < arrayLength - 1, 'down', updateDefenseOrder, overAllIndex, nextDown)}
            <div className='defense-edit-row'>
                <p>{id}</p>
                <input value={defensename ? defensename : ''} onChange={event => updateDefenseInfo('defensename', event.target.value, overAllIndex)} />
                <p>{shield}</p>
                <p>{armor}</p>
                <button className="orange" onClick={_ => removeDefense(overAllIndex)}>
                    <Icon iconName='trash' color='white' />
                </button>
            </div>
        </div>
    )
}