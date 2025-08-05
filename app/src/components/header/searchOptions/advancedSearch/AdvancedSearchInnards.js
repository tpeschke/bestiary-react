import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './AdvancedSearch.css';
import { sizeSearchDictionary, raritySearchDictionary, accessSearchDictionary, minSkullSearchDictionary, maxSkullSearchDictionary } from './utilities/searchDictionaries';
import SearchSelect from './components/SearchSelect';
import Drawers from '../../../drawers/Drawers';
import ClimateSearch from './components/drawers/ClimateSearch';
import Checkbox from '../../../checkbox/Checkbox';
import RoleSearch from './components/drawers/RoleSearch';
import TypeSearch from './components/drawers/TypeSearch';
import SearchStatusHook from '../../../../hooks/SearchStatusHook';
export default function AdvancedSearchInnards({ captureQuery, captureQueryArray }) {
    const { isOnSearch } = SearchStatusHook();
    function stopPropagationAndCaptureQuery(param, event) {
        event.stopPropagation();
        captureQuery(param, event.target.value);
    }
    function stopPropagationAndCaptureQueryFromCheckBox(param) {
        return (event) => {
            event.stopPropagation();
            captureQuery(param, event.target.checked);
        };
    }
    function stopPropagationAndCaptureQueryFromCheckBoxForArray(param, id) {
        return (event) => {
            event.stopPropagation();
            captureQueryArray(param, id, event.target.checked);
        };
    }
    return (_jsxs("div", { className: 'advanced-search-innards-shell', onClick: event => event.stopPropagation(), children: [_jsx("input", { onChange: event => stopPropagationAndCaptureQuery('body', event), placeholder: 'Search in Body' }), _jsxs("div", { className: 'inner-searches-shell', children: [_jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, label: 'Size', param: 'size', dictionary: sizeSearchDictionary }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, label: 'Rarity', param: 'rarity', dictionary: raritySearchDictionary }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, label: 'Access', param: 'access', dictionary: accessSearchDictionary })] }), _jsxs("div", { className: 'inner-searches-shell', children: [_jsxs("div", { className: 'rating-shell', children: [_jsx("p", { children: "Confrontation Rating" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'minConfRate', dictionary: minSkullSearchDictionary }), _jsx("p", { children: "-" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'maxConfRate', dictionary: maxSkullSearchDictionary })] }), _jsxs("div", { className: 'rating-shell', children: [_jsx("p", { children: "Combat Rating" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'minComRate', dictionary: minSkullSearchDictionary }), _jsx("p", { children: "-" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'maxComRate', dictionary: maxSkullSearchDictionary })] }), _jsxs("div", { className: 'rating-shell', children: [_jsx("p", { children: "Skill Rating" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'minChallengeRate', dictionary: minSkullSearchDictionary }), _jsx("p", { children: "-" }), _jsx(SearchSelect, { stopPropagationAndCaptureQuery: stopPropagationAndCaptureQuery, param: 'maxChallengeRate', dictionary: maxSkullSearchDictionary })] })] }), _jsx(Checkbox, { label: 'Anyone Can View?', onClick: stopPropagationAndCaptureQueryFromCheckBox('anyAccess') }), _jsx(Checkbox, { label: 'Has Personal Notes?', onClick: stopPropagationAndCaptureQueryFromCheckBox('personalNotes') }), _jsx(Drawers, { drawerInnards: [ClimateSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray), RoleSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray), TypeSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray)], closeDrawer: !isOnSearch })] }));
}
