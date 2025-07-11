import { Size } from '../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import { CaptureQueryFunction, QueryParams } from '../SearchOptions'
import './AdvancedSearch.css'
import { SizeSearchDictionary } from './utilities/searchDictionaries'

interface Props {
    captureQuery: CaptureQueryFunction
}

export default function AdvancedSearchInnards({ captureQuery }: Props) {

    function stopPropagationAndCaptureQuery(param: QueryParams, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.value)
    }

    return (
        <div className='advanced-search-innards-shell' onClick={event => event.stopPropagation()}>
            <input onChange={event => stopPropagationAndCaptureQuery('body', event)} placeholder='Search in Body' />
            <div className='select-searches-shell'>
                <select onChange={event => stopPropagationAndCaptureQuery('size', event)}>
                    <option value='none'>I Don't Care</option>
                    {SizeSearchDictionary.map((size: Size, index: number) => {
                        return <option key={index} value={size}>{size}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

// rarity
// patreon level
// confrontation rating - min, max
// combat rating - min, max
// challenge rating - min, max
// Anyone can view
// personal notes

// roles
// types
// climates