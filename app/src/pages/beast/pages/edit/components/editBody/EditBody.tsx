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
import SocialRoleSelect from './components/socialEdit/SocialRoleSelect';
import CombatRoleSelect from './components/combatEdit/CombatRoleSelect';
import SkillRoleSelect from './components/skillEdit/SkillRoleSelect';
import StrategyEdit from './components/strategyEdit/StrategyEdit';
import { UpdateGeneralInfoFunctionsObject } from '../../../../hooks/updateUtilities/updateGeneralInfo';
import GeneralInfoEdit from './components/generalInfoEdit/GeneralInfoEdit';

interface Props {
    beast: GMBeastClass,
    updateSelectedRole: UpdateSelectedRoleFunction,
    saveBeast: SaveBeastFunction,
    updateGeneralInfoFunctions: UpdateGeneralInfoFunctionsObject,
    updateSocialInfoFunctions: UpdateSocialInfoFunctionsObject,
    updateCombatInfoFunctions: UpdateCombatInfoFunctionsObject
    updateSkillInfoFunctions: UpdateSkillInfoFunctionsObject
}

export default function EditBody({
    beast,
    updateSelectedRole,
    saveBeast,
    updateGeneralInfoFunctions,
    updateSocialInfoFunctions,
    updateCombatInfoFunctions,
    updateSkillInfoFunctions
}: Props) {
    const [tabIndex, setTabIndex] = useState(4)

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
                        <h1>Main Info</h1>
                        <GeneralInfoEdit generalInfo={generalInfo} updateGeneralInfoFunctions={updateGeneralInfoFunctions} />
                    </>
                }
                {tabIndex === 1 &&
                    <>
                        <h1>Confrontation</h1>
                        <div className='role-and-skull-shell'>
                            <SocialRoleSelect updateSocialInfo={updateSocialInfo} primaryRole={socialInfo.socialRole} secondaryRole={socialInfo.socialSecondary} />
                            <SkullSelection keyValue='socialSkulls' currentSkullValue={socialInfo.socialSkulls} updateSkull={updateSocialInfo} />
                        </div>
                    </>
                }
                {tabIndex === 2 &&
                    <>
                        <h1>Combat</h1>
                        <div className='role-and-skull-shell'>
                            <CombatRoleSelect updateCombatInfo={updateCombatInfo} primaryRole={combatInfo.combatRole} secondaryRole={combatInfo.combatSecondary} />
                            <SkullSelection keyValue='combatSkulls' currentSkullValue={combatInfo.combatSkulls} updateSkull={updateCombatInfo} />
                        </div>
                        <CombatEdit combatInfo={combatInfo} updateCombatInfoFunctions={updateCombatInfoFunctions} combatRoleType={combatRoleType} />
                    </>
                }
                {tabIndex === 3 &&
                    <>
                        <h1>Challenge</h1>
                        <div className='role-and-skull-shell'>
                            <SkillRoleSelect updateSkillInfo={updateSkillInfo} primaryRole={skillInfo.skillRole} secondaryRole={skillInfo.skillSecondary} />
                            <SkullSelection keyValue='skillSkulls' currentSkullValue={skillInfo.skillSkulls} updateSkull={updateSkillInfo} />
                        </div>
                    </>
                }
                {tabIndex === 4 &&
                    <>
                        <h1>Strategies</h1>
                        <StrategyEdit />
                    </>
                }
            </div>

            <h2 className="border">Save</h2>
            <button className="orange" onClick={saveBeast}>Save Entry</button>
        </div>
    )
}