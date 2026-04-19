import './AdvancedSearch.css'
import { sizeSearchDictionary, raritySearchDictionary, accessSearchDictionary } from './utilities/searchDictionaries'
import SearchSelect from './components/SearchSelect'
import Drawers from '../../../drawers/Drawers'
import ClimateSearch from './components/drawers/ClimateSearch'
import { CaptureQueryArrayFunction, CaptureQueryFunction, QueryBasicParams, QueryArrayParams } from './interfaces/SearchInterfaces'
import Checkbox from '../../../checkbox/Checkbox'
import RoleSearch from './components/drawers/RoleSearch'
import TypeSearch from './components/drawers/TypeSearch'
import SearchStatusHook from '../../../../hooks/SearchStatusHook'
import Drawer from '../../../drawers/components/Drawer'
import { useSelector } from 'react-redux'
import { getSystemPreference } from '../../../../redux/slices/userSlice'
import SkullSearch from './components/skullSearch/SkullSearch'
import { BONFIRE, HACKMASTER } from '@bestiary/common/utilities/get/getSystemString'
import EpSearch from './components/skullSearch/EpSearch'

export type StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction = (param: QueryArrayParams, id: number, event: any) => StopPropagationAndCaptureQueryFromCheckBoxForArrayReturnFunction
type StopPropagationAndCaptureQueryFromCheckBoxForArrayReturnFunction = (id: number, event: any) => void

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export type StopPropagationAndCaptureQuery = (param: QueryBasicParams, event: any) => void

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export default function AdvancedSearchInnards({ captureQuery, captureQueryArray }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    
    const { isOnSearch } = SearchStatusHook()

    function stopPropagationAndCaptureQuery(param: QueryBasicParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.value)
    }

    function stopPropagationAndCaptureQueryFromCheckBox(param: QueryBasicParams) {
        return (event: any) => {
            event.stopPropagation()
            captureQuery(param, event.target.checked)
        }
    }

    function stopPropagationAndCaptureQueryFromCheckBoxForArray(param: QueryArrayParams, id: number) {
        return (event: any) => {
            event.stopPropagation()
            captureQueryArray(param, id, event.target.checked)
        }
    }

    return (
        <div className='advanced-search-innards-shell' onClick={event => event.stopPropagation()}>
            <input onChange={event => stopPropagationAndCaptureQuery('body', event)} placeholder='Search in Body' />

            <div className='inner-searches-shell'>
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} label='Size' param='size' dictionary={sizeSearchDictionary} />
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} label='Rarity' param='rarity' dictionary={raritySearchDictionary} />
                <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} label='Access' param='access' dictionary={accessSearchDictionary} />
            </div>

            {systemPreference === BONFIRE && <SkullSearch stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} />}
            {systemPreference === HACKMASTER && <EpSearch stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} />}

            <Checkbox label='Anyone Can View?' onClick={stopPropagationAndCaptureQueryFromCheckBox('anyAccess')} />
            <Checkbox label='Has Personal Notes?' onClick={stopPropagationAndCaptureQueryFromCheckBox('personalNotes')} />

            <Drawers closeDrawer={!isOnSearch}>
                <Drawer label='Climates'>
                    <ClimateSearch stopPropagationAndCaptureQueryFromCheckBoxForArray={stopPropagationAndCaptureQueryFromCheckBoxForArray} />
                </Drawer>
                <Drawer label='Roles'>
                    <RoleSearch stopPropagationAndCaptureQueryFromCheckBoxForArray={stopPropagationAndCaptureQueryFromCheckBoxForArray} />
                </Drawer>
                <Drawer label='Types'>
                    <TypeSearch stopPropagationAndCaptureQueryFromCheckBoxForArray={stopPropagationAndCaptureQueryFromCheckBoxForArray} />
                </Drawer>
            </Drawers>
        </div>
    )
}