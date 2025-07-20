import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { updateAttackOrderFunction } from "../../../../../../hooks/beastHooks"
import AttackEditDisplay from "./components/AttackEditDisplay"

interface Props {
    combatInfo: CombatInfo,
    updateAttackOrder: updateAttackOrderFunction
}

export default function CombatEdit({ combatInfo, updateAttackOrder } : Props) {
    const { attacks } = combatInfo

    return (
        <>
            <AttackEditDisplay attacks={attacks} updateAttackOrder={updateAttackOrder} />
        </>
    )
}