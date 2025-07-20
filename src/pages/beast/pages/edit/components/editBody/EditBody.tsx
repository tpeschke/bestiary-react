import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { updateAttackOrderFunction, UpdateBeastFunction, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass,
    updateAttackOrder: updateAttackOrderFunction,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateBeast: UpdateBeastFunction
}

export default function EditBody({ beast, updateAttackOrder, updateSelectedRole, updateBeast }: Props) {
    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />
            <CombatEdit combatInfo={combatInfo} updateAttackOrder={updateAttackOrder} />

            <h2 className="border">Save</h2>
            <button className="orange" onClick={updateBeast}>Save Entry</button>
        </>
    )
}