import './SearchResults.css'

import { SetLoadingFunction } from '../../../../components/loading/Loading'
import SearchHooks from './SearchHooks'
import { SearchResult } from '../../../../../common/interfaces/search'
import { useEffect } from 'react'
import ResultCard from './resultCard/ResultCard'
import Icon from '../../../../components/icon/Icon'
import { copyLink } from './utilities/copyLink'
import { useNavigate } from 'react-router-dom'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function SearchResults({ setLoading }: Props) {
    const { searchResults, navigateToRandomResult } = SearchHooks()

    const navigate = useNavigate()

    useEffect(() => {
        if (setLoading) {
            setLoading(searchResults.length === 0)
        }
    }, [setLoading, searchResults])

    const getRandomResultTooltip = 'Go to a random result in this list'
    const linkTooltip = 'Copy a link to these search parameters that goes directly to a random result in this list'

    return (
        <>
            {searchResults.length > 0 ? (
                <>
                    <div className='result-info-shell'>
                        <h2>Results: {searchResults.length}</h2>
                        <span>
                            <button data-tooltip-id="my-tooltip" data-tooltip-content={getRandomResultTooltip} onClick={(_: any) => navigateToRandomResult(searchResults, navigate)}>
                                <Icon iconName='dice' tooltip={getRandomResultTooltip} iconSize='h2' />
                            </button>
                            <button data-tooltip-id="my-tooltip" data-tooltip-content={linkTooltip} onClick={copyLink}>
                                <Icon iconName='dice' tooltip={linkTooltip} margin='right' iconSize='h2' />
                                <Icon iconName='link' tooltip={linkTooltip} iconSize='h2' />
                            </button>
                        </span>
                    </div>
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