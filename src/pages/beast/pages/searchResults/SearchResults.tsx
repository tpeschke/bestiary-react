import './SearchResults.css'

import { SetLoadingFunction } from '../../../../components/loading/Loading'
import SearchHooks from './SearchHooks'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    const { searchResults } = SearchHooks()

    if (setLoading) {
        setLoading(searchResults.length > 0)
    }

    return (
        <div className='card-background'>
            :)
        </div>
    )
}