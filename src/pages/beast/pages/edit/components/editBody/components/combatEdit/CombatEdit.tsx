import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { updateOrderFunction } from "../../../../../../hooks/beastHooks"
import AttackEditDisplay from "./components/AttackEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay"

interface Props {
    combatInfo: CombatInfo,
    updateAttackOrder: updateOrderFunction,
    updateDefenseOrder: updateOrderFunction
}

export default function CombatEdit({ combatInfo, updateAttackOrder, updateDefenseOrder } : Props) {
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttackEditDisplay attacks={attacks} updateAttackOrder={updateAttackOrder} />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} />
        </>
    )
}