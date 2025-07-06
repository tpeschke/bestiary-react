import './SearchResults.css'

import { SetLoadingFunction } from '../../../../components/loading/Loading'
import SearchHooks from './SearchHooks'
import { SearchResult } from '../../../../../common/interfaces/search'
import { useEffect } from 'react'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    const { searchResults } = SearchHooks()

    console.log(searchResults)

    useEffect(() => {
        if (setLoading) {
            setLoading(searchResults.length === 0)
        }
    }, [setLoading, searchResults])

    return (
        <>
            {searchResults.length > 0 && searchResults.map((result: SearchResult, index: number) => <p key={index}>{result.name}</p>)}
        </>
    )
}