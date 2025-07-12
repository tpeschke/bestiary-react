import './AdvancedSearch.css'

import Drawers, { DrawerObject } from "../../../drawers/Drawers";
import AdvancedSearchInnards from './AdvancedSearchInnards';
import { CaptureQueryArrayFunction, CaptureQueryFunction } from './interfaces/SearchInterfaces';
import SearchStatusHook from '../../../../hooks/SearchStatusHook';

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export default function AdvancedSearch({ captureQuery, captureQueryArray }: Props) {
    const { isOnSearch } = SearchStatusHook()

    return (
        <div className='advanced-search-shell'>
            <Drawers drawerInnards={[AdvancedSearchDraw(captureQuery, captureQueryArray)]} closeDrawer={!isOnSearch}/>
        </div>
    )
}

function AdvancedSearchDraw(captureQuery: CaptureQueryFunction, captureQueryArray: CaptureQueryArrayFunction): DrawerObject {
    return {
        label: 'Advanced Search',
        innards: AdvancedSearchInnards({captureQuery, captureQueryArray})
    }
}