import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import GMBeastClass from "../../../../models/GMBeastClass";
import CombatEdit from "./components/combatEdit/CombatEdit";

interface Props {
    beast: GMBeastClass
}

export default function EditBody({ beast }: Props) {
    const { generalInfo, combatInfo } = beast
    const { name } = generalInfo

    return (
        <>
            <NameHeader name={`Edit ${name}`} />
            <CombatEdit combatInfo={combatInfo} />
        </>
    )
}