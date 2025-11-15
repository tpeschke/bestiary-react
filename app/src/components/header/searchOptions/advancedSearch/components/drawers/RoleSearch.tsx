import './DrawerSearch.css'

import Checkbox from "../../../../../checkbox/Checkbox";
import { DrawerObject } from "../../../../../drawers/Drawers";
import { StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction } from "../../AdvancedSearchInnards";
import { combatPrimaryDictionary, combatSecondaryDictionary, confrontationPrimaryDictionary, confrontationSecondaryDictionary, skillPrimaryDictionary, skillSecondaryDictionary } from '../../utilities/searchDictionaries';

export default function RoleSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray: StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction): DrawerObject {
    return {
        label: 'Roles',
        innards: formatRoles(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    }
}

function formatRoles(stopPropagationAndCaptureQueryFromCheckBoxForArray: Function) {
    return (
        <div className='search-roles-shell'>
            <div>
                <h4>Confrontation Roles</h4>
                {confrontationPrimaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('socialRoles', id)} />)}
                <p className='italic'>Secondaries</p>
                {confrontationSecondaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('socialRoles', id)} />)}
            </div>
            <div>
                <h4>Combat Roles</h4>
                {combatPrimaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('combatColes', id)} />)}
                <p className='italic'>Secondaries</p>
                {combatSecondaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('combatColes', id)} />)}
            </div>
            <div>
                <h4>Challenge Roles</h4>
                {skillPrimaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('skillRoles', id)} />)}
                <p className='italic'>Secondaries</p>
                {skillSecondaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('skillRoles', id)} />)}
            </div>
        </div>
    )
}
