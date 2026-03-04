import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/updateUtilities/updateCombatInfo"
import { Spell } from "../../../../../../interfaces/infoInterfaces/castingInfo"

interface Props {
    combatInfo: CombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null,
    spells: Spell[]
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType, spells }: Props) {
    const { updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, updateAttackInfo, updateDefenseInfo, removeAttack } = updateCombatInfoFunctions
    const { attacks, defenses } = combatInfo

    return (
        <>
            <AttacksEditDisplay
                attacks={attacks}
                updateAttackOrder={updateAttackOrder} 
                addAttack={addAttack} 
                updateAttackInfo={updateAttackInfo} 
                combatRoleType={combatRoleType}
                removeAttack={removeAttack}
                spells={spells}
            />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} updateDefenseInfo={updateDefenseInfo} />
        </>
    )
}