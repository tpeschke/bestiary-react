import './editBody.css'
import { useState } from "react";
import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { UpdateBeastFunction, UpdateCombatInfoFunctionsObject, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";
import Tabs from "../tabs/TabsDisplay";

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    updateBeast: UpdateBeastFunction,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject
}

export default function EditBody({ beast, updateSelectedRole, updateBeast, updateCombatInfoFunctions }: Props) {
    const [tabIndex, setTabIndex] = useState(1)

    const { generalInfo, combatInfo, roleInfo, selectedRoleIndex, combatRoleType } = beast
    const { name } = generalInfo

    return (
        <div className="edit-body-shell">
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />

            <Tabs setTabIndex={setTabIndex} tabIndex={tabIndex} />
            <div className='edit-body-display'>
                {tabIndex === 0 &&
                    <>
                        <h1>Confrontation</h1>
                    </>
                }
                {tabIndex === 1 &&
                    <>
                        <h1>Combat</h1>
                        <CombatEdit combatInfo={combatInfo} updateCombatInfoFunctions={updateCombatInfoFunctions} combatRoleType={combatRoleType} />
                    </>
                }
                {tabIndex === 2 &&
                    <>
                        <h1>Challenge</h1>
                    </>
                }
            </div>

            <h2 className="border">Save</h2>
            <button className="orange" onClick={updateBeast}>Save Entry</button>
        </div>
    )
}