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
import GeneralInfoEdit, { EditImageInfo } from './components/generalInfoEdit/GeneralInfoEdit';
import StrategicOptionsDisplay from './components/strategyTab/strategicOptions/strategicOptions';
import SocialEdit from './components/socialEdit/SocialEdit';
import EditRandomEncounters from '../editRandomEncounters/EditRandomEncounters';
import SkillEdit from './components/skillEdit/SkillEdit';
import { EditEncounter } from '@bestiary/common/interfaces/encounterInterfaces';

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
    const [tabIndex, setTabIndex] = useState(0)

    const {
        id, rawGeneralInfo, rawCombatInfoByRole, rawSkillInfo, rawSocialInfo, roleInfo, selectedRoleIndex, combatRoleType, spells,
        linkedInfo, imageInfo
    } = beast
    const { name } = rawGeneralInfo
    const { strategiesNLimits, limitNotes, options } = rawCombatInfoByRole

    const { updateSocialInfo } = updateSocialInfoFunctions
    const { updateCombatInfo, updateNonRoleInfo } = updateCombatInfoFunctions
    const { updateSkillInfo } = updateSkillInfoFunctions

    const [randomEncounterInfo, setRandomEncounterInfo] = useState<EditEncounter | null>(null)

    const roleID = roleInfo?.roles[selectedRoleIndex]?.id

    const editImageInfo: EditImageInfo = {
        ...imageInfo,
        beastID: id,
        roleID,
        hasRoles: roleInfo?.roles.length > 0
    }

    return (
        <div className="edit-body-shell">
            <NameHeader name={`Edit ${name}`} />
            <RoleSelect roleInfo={roleInfo} updateSelectedRole={updateSelectedRole} selectedRoleIndex={selectedRoleIndex} />

            <Tabs setTabIndex={setTabIndex} tabIndex={tabIndex} />
            <div className='edit-body-display'>
                {tabIndex === 0 &&
                    <>
                        <h1>Main Info</h1>
                        <GeneralInfoEdit
                            imageInfo={editImageInfo}
                            generalInfo={rawGeneralInfo}
                            updateGeneralInfoFunctions={updateGeneralInfoFunctions}
                            linkedInfo={linkedInfo}
                        />
                    </>
                }
                {tabIndex === 1 &&
                    <>
                        <h1>Confrontation</h1>
                        <div className='role-and-skull-shell'>
                            <SocialRoleSelect updateSocialInfo={updateSocialInfo} primaryRole={rawSocialInfo.socialRole} secondaryRole={rawSocialInfo.socialSecondary} />
                            <SkullSelection skullKeyValue='socialSkulls' epKeyValue='socialRawEpValue' currentSkullValue={rawSocialInfo.socialSkulls} currentEPValue={rawSocialInfo.socialRawEpValue} updateSkull={updateSocialInfo} />
                        </div>
                        <SocialEdit socialInfo={rawSocialInfo} updateSocialInfoFunctions={updateSocialInfoFunctions} />
                    </>
                }
                {tabIndex === 2 &&
                    <>
                        <h1>Combat</h1>
                        <div className='role-and-skull-shell'>
                            <CombatRoleSelect updateCombatInfo={updateCombatInfo} primaryRole={rawCombatInfoByRole.combatRole} secondaryRole={rawCombatInfoByRole.combatSecondary} />
                            <SkullSelection skullKeyValue='combatSkulls' epKeyValue='combatRawEpValue' currentSkullValue={rawCombatInfoByRole.combatSkulls} currentEPValue={rawCombatInfoByRole.combatRawEpValue} updateSkull={updateCombatInfo} />
                        </div>
                        <CombatEdit combatInfo={rawCombatInfoByRole} updateCombatInfoFunctions={updateCombatInfoFunctions} combatRoleType={combatRoleType} spells={spells} />
                    </>
                }
                {tabIndex === 3 &&
                    <>
                        <h1>Challenge</h1>
                        <div className='role-and-skull-shell'>
                            <SkillRoleSelect updateSkillInfo={updateSkillInfo} primaryRole={rawSkillInfo.skillRole} secondaryRole={rawSkillInfo.skillSecondary} />
                            <SkullSelection skullKeyValue='skillSkulls' epKeyValue='skillRawEpValue' currentSkullValue={rawSkillInfo.skillSkulls} currentEPValue={rawSkillInfo.skillRawEpValue} updateSkull={updateSkillInfo} />
                        </div>
                        <SkillEdit skillInfo={rawSkillInfo} updateSkillInfo={updateSkillInfo} roleID={roleID} />
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
                        <EditRandomEncounters beastID={id} randomEncounterInfo={randomEncounterInfo} setRandomEncounterInfo={setRandomEncounterInfo} />
                    </>
                }
            </div>

            <h2 className="border">Save</h2>
            <button className="orange" onClick={_ => saveBeast(randomEncounterInfo)}>Save Entry</button>
        </div>
    )
}