import './DrawerSearch.css'

import { DrawerObject } from "../../../../../drawers/Drawers";
import { StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction } from "../../AdvancedSearchInnards";
import { typeSearchDictionary } from "../../utilities/searchDictionaries";
import Checkbox from '../../../../../checkbox/Checkbox';

export default function TypeSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray: StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction): DrawerObject {
    return {
        label: 'Types',
        innards: formatTypes(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    }
}

function formatTypes(stopPropagationAndCaptureQueryFromCheckBoxForArray: Function) {
    return (
        <>
            {typeSearchDictionary.map(({ id, value }, index) => <Checkbox key={index} label={value} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('types', id)} />)}
        </>
    )
}