import { useNavigate } from 'react-router-dom'
import { SearchResult } from '../../../../../../../common/interfaces/search'
import Icon from '../../../../../../components/icon/Icon'
import { NavigateToRandomResultFunction } from '../../SearchHooks'
import '../../SearchResults.css'
import { copyLink } from '../../utilities/copyLink'

interface Props {
    searchResults: SearchResult[],
    navigateToRandomResult: NavigateToRandomResultFunction
}

export default function SearchTopBar({ searchResults, navigateToRandomResult }: Props) {
    const navigate = useNavigate()

    const getRandomResultTooltip = 'Go to a random result in this list'
    const linkTooltip = 'Copy a link to these search parameters that goes directly to a random result in this list'

    return (
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
    )
}