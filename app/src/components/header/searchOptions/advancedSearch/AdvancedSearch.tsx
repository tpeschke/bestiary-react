import './AdvancedSearch.css'

import Drawers, { DrawerObject } from "../../../drawers/Drawers";
import AdvancedSearchInnards from './AdvancedSearchInnards';
import { CaptureQueryArrayFunction, CaptureQueryFunction } from './interfaces/SearchInterfaces';
import SearchStatusHook from '../../../../hooks/SearchStatusHook';
import Drawer from '../../../drawers/components/Drawer';

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export default function AdvancedSearch({ captureQuery, captureQueryArray }: Props) {
    const { isOnSearch } = SearchStatusHook()

    return (
        <div className='advanced-search-shell'>
            <Drawers closeDrawer={!isOnSearch}>
                <Drawer label='Advanced Search'>
                    <AdvancedSearchInnards captureQuery={captureQuery} captureQueryArray={captureQueryArray} />
                </Drawer>
            </Drawers>
        </div>
    )
}