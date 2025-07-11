import './AdvancedSearch.css'
import { CaptureQueryFunction, QueryParams } from '../SearchOptions'
import { sizeSearchDictionary, raritySearchDictionary, accessSearchDictionary, minSkullSearchDictionary, maxSkullSearchDictionary } from './utilities/searchDictionaries'
import SearchSelect from './components/SearchSelect'

interface Props {
    captureQuery: CaptureQueryFunction
}

export type StopPropagationAndCaptureQuery = (param: QueryParams, event: any) => void

export default function AdvancedSearchInnards({ captureQuery }: Props) {

    function stopPropagationAndCaptureQuery(param: QueryParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.value)
    }

    function stopPropagationAndCaptureQueryFromCheckBox(param: QueryParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.checked)
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
                <label>Anyone Can View?</label>
                <input type="checkbox" onClick={event => stopPropagationAndCaptureQueryFromCheckBox('anyAccess', event)} />
            </div>

            <div className='rating-shell checkbox-shell'>
                <label>Has Personal Notes?</label>
                <input type="checkbox" onClick={event => stopPropagationAndCaptureQueryFromCheckBox('personalNotes', event)} />
            </div>
        </div>
    )
}

// roles
// types
// climates