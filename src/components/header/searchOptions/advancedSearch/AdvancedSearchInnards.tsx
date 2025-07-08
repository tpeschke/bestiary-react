import { CaptureQueryFunction } from '../SearchOptions'
import './AdvancedSearch.css'

interface Props {
    captureQuery: CaptureQueryFunction
}

export default function AdvancedSearchInnards({ captureQuery }: Props) {

    function stopPropagationAndCaptureQuery(param: string, event: any) {
        event.stopPropagation()
        captureQuery(param, event.target.value)
    }

    return (
        <div className='advanced-search-innards-shell' onClick={event => event.stopPropagation()}>
            <input onChange={event => stopPropagationAndCaptureQuery('body', event)} placeholder='Search in Body' />
        </div>
    )
}

// size
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