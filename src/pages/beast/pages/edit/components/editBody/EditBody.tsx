import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { updateAttackOrderFunction, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass,
    updateAttackOrder: updateAttackOrderFunction,
    updateSelectedRole: UpdateSelectedRoleFunction
}

export default function EditBody({ beast, updateAttackOrder, updateSelectedRole }: Props) {
    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />
            <CombatEdit combatInfo={combatInfo} updateAttackOrder={updateAttackOrder} />
        </>
    )
}