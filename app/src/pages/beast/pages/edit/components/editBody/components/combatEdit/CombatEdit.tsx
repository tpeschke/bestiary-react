import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/updateUtilities/updateCombatInfo"

interface Props {
    combatInfo: CombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType }: Props) {
    const { updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, updateAttackInfo, updateDefenseInfo, removeAttack } = updateCombatInfoFunctions
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttacksEditDisplay
                attacks={attacks} updateAttackOrder={updateAttackOrder} addAttack={addAttack} updateAttackInfo={updateAttackInfo} combatRoleType={combatRoleType}
                removeAttack={removeAttack}
            />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} updateDefenseInfo={updateDefenseInfo} />
        </>
    )
}