import { NonspecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/updateUtilities/updateCombatInfo"
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"

interface Props {
    combatInfo: NonspecificCombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null,
    spells: Spell[]
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType, spells }: Props) {
    const {
        updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, addDefense, updateAttackStats, updateDefenseInfo, removeAttack,
        updateNonRoleInfo, updateCombatInfo
    } = updateCombatInfoFunctions
    const { attacks, defenses, attackInfo, roleAttackInfo, defenseInfo, roleDefenseInfo } = combatInfo

    return (
        <>
            <DefenseEditDisplay
                defenses={defenses}
                updateDefenseOrder={updateDefenseOrder}
                removeDefense={removeDefense}
                addDefense={addDefense}
                updateDefenseInfo={updateDefenseInfo}
                defenseInfo={defenseInfo}
                roleDefenseInfo={roleDefenseInfo}
                updateNonRoleInfo={updateNonRoleInfo}
                updateCombatInfo={updateCombatInfo}
            />
            <AttacksEditDisplay
                attacks={attacks}
                updateAttackOrder={updateAttackOrder}
                addAttack={addAttack}
                updateAttackStats={updateAttackStats}
                combatRoleType={combatRoleType}
                removeAttack={removeAttack}
                spells={spells}
                attackInfo={attackInfo}
                roleAttackInfo={roleAttackInfo}
                updateNonRoleInfo={updateNonRoleInfo}
                updateCombatInfo={updateCombatInfo}
            />
        </>
    )
}