import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/beastHooks"
import AttacksEditDisplay from "./components/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay"

interface Props {
    combatInfo: CombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    roleName: string | null
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, roleName } : Props) {
    const { updateAttackOrder, updateDefenseOrder, removeDefense, updateSituation } = updateCombatInfoFunctions
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttacksEditDisplay attacks={attacks} updateAttackOrder={updateAttackOrder} updateSituation={updateSituation} roleName={roleName} />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} />
        </>
    )
}