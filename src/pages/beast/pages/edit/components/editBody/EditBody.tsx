import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { updateAttackOrderFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass,
    updateAttackOrder: updateAttackOrderFunction
}

export default function EditBody({ beast, updateAttackOrder }: Props) {
    const { generalInfo, combatInfo } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <CombatEdit combatInfo={combatInfo} updateAttackOrder={updateAttackOrder} />
        </>
    )
}