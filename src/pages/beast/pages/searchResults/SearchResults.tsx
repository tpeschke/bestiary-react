import './SearchResults.css'

import { SetLoadingFunction } from '../../../../components/loading/Loading'
import SearchHooks from './SearchHooks'
import { SearchResult } from '../../../../../common/interfaces/search'
import { useEffect } from 'react'
import ResultCard from './resultCard/ResultCard'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    const { searchResults } = SearchHooks()

    useEffect(() => {
        if (setLoading) {
            setLoading(searchResults.length === 0)
        }
    }, [setLoading, searchResults])

    return (
        <>
            {searchResults.length > 0 && searchResults.map((result: SearchResult, index: number) => <ResultCard key={index} searchResult={result} />)}
        </>
    )
}