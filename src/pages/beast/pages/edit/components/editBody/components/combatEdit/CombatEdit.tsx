import CombatInfo from "../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/beastHooks"
import AttacksEditDisplay from "./components/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay"

interface Props {
    combatInfo: CombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType } : Props) {
    const { updateAttackOrder, updateDefenseOrder, removeDefense, updateAttackInfo } = updateCombatInfoFunctions
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttacksEditDisplay attacks={attacks} updateAttackOrder={updateAttackOrder} updateAttackInfo={updateAttackInfo} combatRoleType={combatRoleType} />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} />
        </>
    )
}