import './AdvancedSearch.css'
import { sizeSearchDictionary, raritySearchDictionary, accessSearchDictionary, minSkullSearchDictionary, maxSkullSearchDictionary } from './utilities/searchDictionaries'
import SearchSelect from './components/SearchSelect'
import Drawers from '../../../drawers/Drawers'
import ClimateSearch from './components/drawers/ClimateSearch'
import { CaptureQueryArrayFunction, CaptureQueryFunction, QueryBasicParams, QueryArrayParams } from './interfaces/SearchInterfaces'
import Checkbox from '../../../checkbox/Checkbox'
import RoleSearch from './components/drawers/RoleSearch'
import TypeSearch from './components/drawers/TypeSearch'
import SearchStatusHook from '../../../../hooks/SearchStatusHook'

export type StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction = (param: QueryArrayParams, id: number, event: any) => StopPropagationAndCaptureQueryFromCheckBoxForArrayReturnFunction
type StopPropagationAndCaptureQueryFromCheckBoxForArrayReturnFunction = (id: number, event: any) => void

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export type StopPropagationAndCaptureQuery = (param: QueryBasicParams, event: any) => void

export default function AdvancedSearchInnards({ captureQuery, captureQueryArray }: Props) {
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

            <div className='inner-searches-shell'>
                <div className='rating-shell'>
                    <p>Confrontation Rating</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minConfRate' dictionary={minSkullSearchDictionary} />
                    <p>-</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxConfRate' dictionary={maxSkullSearchDictionary} />
                </div>

                <div className='rating-shell'>
                    <p>Combat Rating</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minComRate' dictionary={minSkullSearchDictionary} />
                    <p>-</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxComRate' dictionary={maxSkullSearchDictionary} />
                </div>

                <div className='rating-shell'>
                    <p>Skill Rating</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='minChallengeRate' dictionary={minSkullSearchDictionary} />
                    <p>-</p>
                    <SearchSelect stopPropagationAndCaptureQuery={stopPropagationAndCaptureQuery} param='maxChallengeRate' dictionary={maxSkullSearchDictionary} />
                </div>
            </div>

            <Checkbox label='Anyone Can View?' onClick={stopPropagationAndCaptureQueryFromCheckBox('anyAccess')} />
            <Checkbox label='Has Personal Notes?' onClick={stopPropagationAndCaptureQueryFromCheckBox('personalNotes')} />

            <Drawers
                drawerInnards={[ClimateSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray), RoleSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray), TypeSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray)]}
                closeDrawer={!isOnSearch}
            />
        </div>
    )
}