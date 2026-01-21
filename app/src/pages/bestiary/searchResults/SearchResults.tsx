import './SearchResults.css'

import SearchHooks from './SearchHooks'
import { SearchResult } from '@bestiary/common/interfaces/search'
import { useEffect } from 'react'
import ResultCard from './components/resultCard/ResultCard'
import SearchTopBar from './components/SearchTopBar/SearchTopBar'
import { SetLoadingFunction } from '../../../components/loading/Loading'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    document.title = 'Search Results - Bonfire Bestiary'

    const { searchResults, navigateToRandomResult, sortingMethodInfo, sortingDirectionInfo } = SearchHooks()

    useEffect(() => {
        if (setLoading) {
            setLoading(!!searchResults)
        }
    }, [searchResults])

    return (
        <>
            {searchResults && searchResults?.length > 0 ? (
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