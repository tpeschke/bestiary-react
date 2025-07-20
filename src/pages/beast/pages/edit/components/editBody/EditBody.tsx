import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { UpdateBeastFunction, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import { CombatInfoFunctions } from "../../EditView";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateBeast: UpdateBeastFunction,
    combatInfoFunctions: CombatInfoFunctions
}

export default function EditBody({ beast, updateSelectedRole, updateBeast, combatInfoFunctions }: Props) {
    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />
            <CombatEdit combatInfo={combatInfo} combatInfoFunctions={combatInfoFunctions} />

            <h2 className="border">Save</h2>
            <button className="orange" onClick={updateBeast}>Save Entry</button>
        </>
    )
}