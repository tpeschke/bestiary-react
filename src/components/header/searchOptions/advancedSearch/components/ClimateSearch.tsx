import { DrawerObject } from "../../../../drawers/Drawers";
import { StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction } from "../AdvancedSearchInnards";
import { climateSearchDictionary } from "../utilities/searchDictionaries";

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
                    <div onClick={event => stopPropagationAndCaptureQueryFromCheckBoxForArray('climate', id, event)} key={index} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} className='rating-shell checkbox-shell'>
                        <input type="checkbox"/>
                        <label>{climate}</label>
                    </div>
                )
            })}
        </>
    )
}
