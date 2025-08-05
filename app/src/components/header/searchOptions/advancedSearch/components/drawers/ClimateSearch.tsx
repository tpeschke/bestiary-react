import './DrawerSearch.css'

import Checkbox from "../../../../../checkbox/Checkbox";
import { DrawerObject } from "../../../../../drawers/Drawers";
import { StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction } from "../../AdvancedSearchInnards";
import { climateSearchDictionary } from "../../utilities/searchDictionaries";

export default function ClimateSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray: StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction): DrawerObject {
    return {
        label: 'Climates',
        innards: formatClimates(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    }
}

function formatClimates(stopPropagationAndCaptureQueryFromCheckBoxForArray: Function) {
    return (
        <>
            {climateSearchDictionary.map(({id, code, climate, examples}, index) => {
                const tooltip = `${examples}${code ? '\nKöppen Climate Classification: ' + code : ''}`
                return (
                    <Checkbox key={index} label={climate} onClick={stopPropagationAndCaptureQueryFromCheckBoxForArray('climate', id)} tooltip={tooltip}/>
                )
            })}
        </>
    )
}
