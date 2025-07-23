import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { UpdateBeastFunction, UpdateCombatInfoFunctionsObject, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateBeast: UpdateBeastFunction,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject
}

export default function EditBody({ beast, updateSelectedRole, updateBeast, updateCombatInfoFunctions }: Props) {
    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex, roleName} = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />
            <CombatEdit combatInfo={combatInfo} updateCombatInfoFunctions={updateCombatInfoFunctions} roleName={roleName} />

            <h2 className="border">Save</h2>
            <button className="orange" onClick={updateBeast}>Save Entry</button>
        </>
    )
}