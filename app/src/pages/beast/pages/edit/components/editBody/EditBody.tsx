import './editBody.css'
import { useState } from "react";
import NameHeader from "../../../../components/UI/nameHeader/nameHeader";
import { SaveBeastFunction, UpdateSelectedRoleFunction } from "../../../../hooks/beastHooks";
import GMBeastClass from "../../../../models/gmBeastClass/GMBeastClass";
import RoleSelect from "../../../view/gmView/components/leftColumn/components/roleSelect/RoleSelect";
import CombatEdit from "./components/combatEdit/CombatEdit";
import Tabs from "./components/tabs/TabsDisplay";
import SkullSelection from './components/SkullSelection';
import { UpdateCombatInfoFunctionsObject } from '../../../../hooks/updateUtilities/updateCombatInfo';
import { UpdateSkillInfoFunctionsObject } from '../../../../hooks/updateUtilities/updateSkillInfo';
import { UpdateSocialInfoFunctionsObject } from '../../../../hooks/updateUtilities/updateSocialInfo';

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    saveBeast: SaveBeastFunction,
    updateSocialInfoFunctions: UpdateSocialInfoFunctionsObject,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject
    updateSkillInfoFunctions: UpdateSkillInfoFunctionsObject
}

export default function EditBody({ 
    beast, 
    updateSelectedRole, 
    saveBeast, 
    updateSocialInfoFunctions, 
    updateCombatInfoFunctions,
    updateSkillInfoFunctions
}: Props) {
    const [tabIndex, setTabIndex] = useState(1)

    const { generalInfo, combatInfo, skillInfo, socialInfo, roleInfo, selectedRoleIndex, combatRoleType } = beast
    const { name } = generalInfo

    const { updateSocialInfo } = updateSocialInfoFunctions
    const { updateCombatInfo } = updateCombatInfoFunctions
    const { updateSkillInfo } = updateSkillInfoFunctions

    return (
        <div className="edit-body-shell">
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />

            <Tabs setTabIndex={setTabIndex} tabIndex={tabIndex} />
            <div className='edit-body-display'>
                {tabIndex === 0 &&
                    <>
                        <h1>Confrontation</h1>
                        <SkullSelection keyValue='socialSkulls' currentSkullValue={socialInfo.socialSkulls} updateSkull={updateSocialInfo}/>
                    </>
                }
                {tabIndex === 1 &&
                    <>
                        <h1>Combat</h1>
                        <SkullSelection keyValue='combatSkulls' currentSkullValue={combatInfo.combatSkulls} updateSkull={updateCombatInfo} />
                        <CombatEdit combatInfo={combatInfo} updateCombatInfoFunctions={updateCombatInfoFunctions} combatRoleType={combatRoleType} />
                    </>
                }
                {tabIndex === 2 &&
                    <>
                        <h1>Challenge</h1>
                        <SkullSelection keyValue='skillSkulls' currentSkullValue={skillInfo.skillSkulls} updateSkull={updateSkillInfo}/>
                    </>
                }
            </div>

            <h2 className="border">Save</h2>
            <button className="orange" onClick={saveBeast}>Save Entry</button>
        </div>
    )
}