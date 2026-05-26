import { NonspecificCombatInfo, SpecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/updateUtilities/updateCombatInfo"
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import Body from "../../../../../../components/UI/body/Body"
import DefenseInfoEdit from "../components/info/DefenseInfoEdit"

interface Props {
    combatInfo: NonspecificCombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null,
    spells: Spell[]
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType, spells }: Props) {
    const {
        updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, updateAttackInfo, updateDefenseInfo, removeAttack,
        updateNonRoleInfo
    } = updateCombatInfoFunctions
    const { attacks, defenses, attackInfo, defenseInfo } = combatInfo

    return (
        <>
            <AttacksEditDisplay
                attacks={attacks}
                updateAttackOrder={updateAttackOrder}
                addAttack={addAttack}
                updateAttackStats={updateAttackInfo}
                combatRoleType={combatRoleType}
                removeAttack={removeAttack}
                spells={spells}
                attackInfo={attackInfo}
                updateNonRoleInfo={updateNonRoleInfo}
            />
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} updateDefenseInfo={updateDefenseInfo} defenseInfo={defenseInfo} updateNonRoleInfo={updateNonRoleInfo} />
        </>
    )
}