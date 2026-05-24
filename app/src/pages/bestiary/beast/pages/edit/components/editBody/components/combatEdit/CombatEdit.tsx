import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import AttacksEditDisplay from "./components/AttacksEditDisplay/AttacksEditDisplay"
import DefenseEditDisplay from "./components/DefenseEditDisplay/DefenseEditDisplay"
import { UpdateCombatInfoFunctionsObject } from "../../../../../../hooks/updateUtilities/updateCombatInfo"
import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import Body from "../../../../../../components/UI/body/Body"
import DefenseInfoEdit from "./components/DefenseInfo"

interface Props {
    combatInfo: CombatInfo,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject,
    combatRoleType: string | null,
    spells: Spell[]
}

export default function CombatEdit({ combatInfo, updateCombatInfoFunctions, combatRoleType, spells }: Props) {
    const {
        updateAttackOrder, addAttack, updateDefenseOrder, removeDefense, updateAttackInfo, updateDefenseInfo, removeAttack,
        updateNonRoleInfo
    } = updateCombatInfoFunctions
    const { attacks, defenses, defenseInfo } = combatInfo

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
            <Body>
                <h2 className="border">Defense Info</h2>
                <DefenseInfoEdit defenseInfo={defenseInfo} updateDefenseInfo={updateNonRoleInfo} />
            </Body>
            <DefenseEditDisplay defenses={defenses} updateDefenseOrder={updateDefenseOrder} removeDefense={removeDefense} updateDefenseInfo={updateDefenseInfo} />
        </>
    )
}