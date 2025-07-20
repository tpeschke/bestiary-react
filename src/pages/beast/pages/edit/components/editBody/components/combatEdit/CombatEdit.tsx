import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { CombatInfoFunctions } from "../../../../EditView"
import AttackEditDisplay from "./components/AttackEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay"

interface Props {
    combatInfo: CombatInfo,
    combatInfoFunctions: CombatInfoFunctions
}

export default function CombatEdit({ combatInfo, combatInfoFunctions } : Props) {
    const { updateAttackOrder, updateDefenseOrder, removeDefense } = combatInfoFunctions
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttackEditDisplay attacks={attacks} updateAttackOrder={updateAttackOrder} />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} />
        </>
    )
}