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
import StrategyEdit from './components/strategyTab/strategyEdit/StrategyEdit';
import { UpdateGeneralInfoFunctionsObject } from '../../../../hooks/updateUtilities/updateGeneralInfo';
import GeneralInfoEdit from './components/generalInfoEdit/GeneralInfoEdit';
import StrategicOptionsDisplay from './components/strategyTab/strategicOptions/strategicOptions';
import SocialEdit from './components/socialEdit/SocialEdit';
import EditRandomEncounters from '../editRandomEncounters/EditRandomEncounters';
import { EditEncounter } from '../../../view/gmView/components/rightColumn/components/encounterDisplay/interfaces/EncounterInterfaces';

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
    const [tabIndex, setTabIndex] = useState(5)

    const { id, generalInfo, combatInfo, skillInfo, socialInfo, roleInfo, selectedRoleIndex, combatRoleType, spells } = beast
    const { name } = generalInfo
    const { strategiesNLimits, limitNotes, options } = combatInfo

    const { updateSocialInfo } = updateSocialInfoFunctions
    const { updateCombatInfo, updateNonRoleInfo } = updateCombatInfoFunctions
    const { updateSkillInfo } = updateSkillInfoFunctions

    const [randomEncounterInfo, setRandomEncounterInfo] = useState<EditEncounter | null>(null)

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
                        <SocialEdit socialInfo={socialInfo} updateSocialInfoFunctions={updateSocialInfoFunctions} />
                    </>
                }
                {tabIndex === 2 &&
                    <>
                        <h1>Combat</h1>
                        <div className='role-and-skull-shell'>
                            <CombatRoleSelect updateCombatInfo={updateCombatInfo} primaryRole={combatInfo.combatRole} secondaryRole={combatInfo.combatSecondary} />
                            <SkullSelection keyValue='combatSkulls' currentSkullValue={combatInfo.combatSkulls} updateSkull={updateCombatInfo} />
                        </div>
                        <CombatEdit combatInfo={combatInfo} updateCombatInfoFunctions={updateCombatInfoFunctions} combatRoleType={combatRoleType} spells={spells} />
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
                        <StrategyEdit strategiesNLimits={strategiesNLimits} limitNotes={limitNotes} updateCombatInfo={updateNonRoleInfo} />
                        <StrategicOptionsDisplay options={options} updateCombatInfo={updateNonRoleInfo} />
                    </>
                }
                {tabIndex === 5 &&
                    <>
                        <h1>Random Encounters</h1>
                        <EditRandomEncounters beastID={id} randomEncounterInfo={randomEncounterInfo} setRandomEncounterInfo={setRandomEncounterInfo}/>
                    </>
                }
            </div>

            <h2 className="border">Save</h2>
            <button className="orange" onClick={_ => saveBeast(randomEncounterInfo)}>Save Entry</button>
        </div>
    )
}