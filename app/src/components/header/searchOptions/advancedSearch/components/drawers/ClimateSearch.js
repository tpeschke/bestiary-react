import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './DrawerSearch.css';
import Checkbox from "../../../../../checkbox/Checkbox";
import { climateSearchDictionary } from "../../utilities/searchDictionaries";
export default function ClimateSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return {
        label: 'Climates',
        innards: formatClimates(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    };
}
function formatClimates(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return (_jsx(_Fragment, { children: climateSearchDictionary.map(({ id, code, climate, examples }, index) => {
            const tooltip = `${examples}${code ? '\nKöppen Climate Classification: ' + code : ''}`;
            return (_jsx(Checkbox, { label: climate, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('climate', id), tooltip: tooltip }, index));
        }) }));
}
