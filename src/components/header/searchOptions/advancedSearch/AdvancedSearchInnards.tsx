import './AdvancedSearch.css'
import { sizeSearchDictionary, raritySearchDictionary, accessSearchDictionary, minSkullSearchDictionary, maxSkullSearchDictionary } from './utilities/searchDictionaries'
import SearchSelect from './components/SearchSelect'
import Drawers from '../../../drawers/Drawers'
import ClimateSearch from './components/ClimateSearch'
import { CaptureQueryArrayFunction, CaptureQueryFunction, QueryBasicParams, QueryArrayParams } from './interfaces/SearchInterfaces'

export type StopPropagationAndCaptureQueryFromCheckBoxForArrayFunction = (param: QueryArrayParams, id: number, event: any) => void

interface Props {
    captureQuery: CaptureQueryFunction,
    captureQueryArray: CaptureQueryArrayFunction
}

export type StopPropagationAndCaptureQuery = (param: QueryBasicParams, event: any) => void

export default function AdvancedSearchInnards({ captureQuery, captureQueryArray }: Props) {

    function stopPropagationAndCaptureQuery(param: QueryBasicParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.value)
    }

    function stopPropagationAndCaptureQueryFromCheckBox(param: QueryBasicParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.checked)
    }

    function stopPropagationAndCaptureQueryFromCheckBoxForArray(param: QueryArrayParams, id: number, event: any) {
        event.stopPropagation()
        captureQueryArray(param, id, event.target.checked)
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

            <div className='rating-shell checkbox-shell'>
                <input type="checkbox" onClick={event => stopPropagationAndCaptureQueryFromCheckBox('anyAccess', event)} />
                <label>Anyone Can View?</label>
            </div>

            <div className='rating-shell checkbox-shell'>
                <input type="checkbox" onClick={event => stopPropagationAndCaptureQueryFromCheckBox('personalNotes', event)} />
                <label>Has Personal Notes?</label>
            </div>

            <Drawers drawerInnards={[ClimateSearch(stopPropagationAndCaptureQueryFromCheckBoxForArray)]}/>
        </div>
    )
}

// roles
// types