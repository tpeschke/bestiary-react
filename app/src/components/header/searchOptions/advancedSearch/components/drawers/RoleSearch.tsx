import './DrawerSearch.css'

import Checkbox from "../../../../../checkbox/Checkbox";
import { combatPrimaryDictionary, combatSecondaryDictionary, confrontationPrimaryDictionary, confrontationSecondaryDictionary, skillPrimaryDictionary, skillSecondaryDictionary } from '../../utilities/searchDictionaries';

interface Props {
    stopPropagationAndCaptureQueryFromCheckBoxForArray: Function
}

export default function RoleSearch({ stopPropagationAndCaptureQueryFromCheckBoxForArray }: Props) {
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
                {combatPrimaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('combatRoles', id)} />)}
                <p className='italic'>Secondaries</p>
                {combatSecondaryDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('combatRoles', id)} />)}
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