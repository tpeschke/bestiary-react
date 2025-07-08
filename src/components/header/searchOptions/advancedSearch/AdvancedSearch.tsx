import './AdvancedSearch.css'

import Drawers, { DrawerObject } from "../../../drawers/Drawers";
import AdvancedSearchInnards from './AdvancedSearchInnards';
import { CaptureQueryFunction } from '../SearchOptions';

interface Props {
    captureQuery: CaptureQueryFunction
}

export default function AdvancedSearch({ captureQuery }: Props) {

    return (
        <div className='advanced-search-shell'>
            <Drawers drawerInnards={[AdvancedSearchDraw(captureQuery)]}/>
        </div>
    )
}

function AdvancedSearchDraw(captureQuery: CaptureQueryFunction): DrawerObject {
    return {
        label: 'Advanced Search',
        innards: AdvancedSearchInnards({captureQuery})
    }
}

// body
// 