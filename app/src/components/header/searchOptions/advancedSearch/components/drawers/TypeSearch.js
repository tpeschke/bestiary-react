import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './DrawerSearch.css';
import { typeSearchDictionary } from "../../utilities/searchDictionaries";
import Checkbox from '../../../../../checkbox/Checkbox';
export default function TypeSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return {
        label: 'Types',
        innards: formatTypes(stopPropagationAndCaptureQueryFromCheckBoxForArray)
    };
}
function formatTypes(stopPropagationAndCaptureQueryFromCheckBoxForArray) {
    return (_jsx(_Fragment, { children: typeSearchDictionary.map(({ id, value }, index) => _jsx(Checkbox, { label: value, onClick: stopPropagationAndCaptureQueryFromCheckBoxForArray('types', id) }, index)) }));
}
