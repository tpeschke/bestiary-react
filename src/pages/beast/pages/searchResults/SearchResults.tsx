import './SearchResults.css'

import { SetLoadingFunction } from '../../../../components/loading/Loading'
import SearchHooks from './SearchHooks'
import { SearchResult } from '../../../../../common/interfaces/search'
import { useEffect } from 'react'
import ResultCard from './components/resultCard/ResultCard'
import SearchTopBar from './components/SearchTopBar/SearchTopBar'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    const { searchResults, navigateToRandomResult, sortingMethodInfo, sortingDirectionInfo } = SearchHooks()

    useEffect(() => {
        if (setLoading) {
            setLoading(searchResults.length === 0)
        }
    }, [setLoading, searchResults])

    return (
        <>
            {searchResults.length > 0 ? (
                <>
                    <SearchTopBar searchResults={searchResults} navigateToRandomResult={navigateToRandomResult} sortingMethodInfo={sortingMethodInfo} sortingDirectionInfo={sortingDirectionInfo} />
                    {searchResults.map((result: SearchResult, index: number) => <ResultCard key={index} searchResult={result} />)}
                </>
            ) : (
                <div className='result-info-shell no-results'>
                    <h2>No Results Found</h2>
                </div>
            )}
        </>
    )
}