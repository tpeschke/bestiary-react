import { jsx as _jsx } from "react/jsx-runtime";
import './AdvancedSearch.css';
import Drawers from "../../../drawers/Drawers";
import AdvancedSearchInnards from './AdvancedSearchInnards';
import SearchStatusHook from '../../../../hooks/SearchStatusHook';
export default function AdvancedSearch({ captureQuery, captureQueryArray }) {
    const { isOnSearch } = SearchStatusHook();
    return (_jsx("div", { className: 'advanced-search-shell', children: _jsx(Drawers, { drawerInnards: [AdvancedSearchDraw(captureQuery, captureQueryArray)], closeDrawer: !isOnSearch }) }));
}
function AdvancedSearchDraw(captureQuery, captureQueryArray) {
    return {
        label: 'Advanced Search',
        innards: AdvancedSearchInnards({ captureQuery, captureQueryArray })
    };
}
