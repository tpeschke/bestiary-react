import '../../SearchResults.css'
import { useNavigate } from 'react-router-dom'
import { SearchResult } from '../../../../../../../common/interfaces/search'
import Icon from '../../../../../../components/icon/Icon'
import { NavigateToRandomResultFunction, SortingDirection, SortingDirectionObject, SortingMethodObject, SortingOptions } from '../../SearchHooks'
import { copyLink } from '../../utilities/copyLink'

interface Props {
    searchResults: SearchResult[],
    navigateToRandomResult: NavigateToRandomResultFunction,
    sortingMethodInfo: SortingMethodObject,
    sortingDirectionInfo: SortingDirectionObject
}

type IconSortTypes = 'alpha' | 'number'

export default function SearchTopBar({ searchResults, navigateToRandomResult, sortingMethodInfo, sortingDirectionInfo }: Props) {
    const navigate = useNavigate()

    const getRandomResultTooltip = 'Go to a random result in this list'
    const linkTooltip = 'Copy a link to these search parameters that goes directly to a random result in this list'

    function handleSortingClick(type: SortingOptions) {
        if (type === sortingMethodInfo.sortingMethod) {
            sortingDirectionInfo.toggleDirection()
        } else {
            sortingMethodInfo.changeMethod(type)
        }
    }

    return (
        <div className='result-info-shell'>
            <span>
                <h2>Results: {searchResults.length}</h2>
                {searchResults.length === 25 && <p>(max: refine your search)</p>}
            </span>
            <div className='result-sort-shell'>
                {formatSortingOption(handleSortingClick, 'name', 'Name', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha')}
                <p>|</p>
                {formatSortingOption(handleSortingClick, 'maxsocial', 'Confrontation', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number')}
                <p>|</p>
                {formatSortingOption(handleSortingClick, 'maxcombat', 'Combat', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number')}
                <p>|</p>
                {formatSortingOption(handleSortingClick, 'maxskill', 'Skill', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number')}
                <p>|</p>
                {formatSortingOption(handleSortingClick, 'rarity', 'Rarity', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha')}
                <p>|</p>
                {formatSortingOption(handleSortingClick, 'size', 'Size', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha')}
            </div>
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

function formatSortingOption(handleSortingClick: Function, type: SortingOptions, title: string, currentMethod: SortingOptions, currentDirection: SortingDirection, directionType: IconSortTypes) {
    const isActive = currentMethod === type
    return (
        <p className={isActive ? 'is-the-active-sort sort-option' : 'sort-option'} onClick={_ => handleSortingClick(type)}>
            {title}
            {isActive && <Icon iconName={findIcon(currentDirection, directionType)} color='white' margin='left' />}
        </p>
    )
}

function findIcon(currentDirection: SortingDirection, directionType: IconSortTypes) {
    if (currentDirection === 'asc') {
        if (directionType == 'alpha') {
            return 'direction-alphabet-z'
        } else {
            return 'direction-number-9'
        }
    } else {
        if (directionType == 'alpha') {
            return 'direction-alphabet-a'
        } else {
            return 'direction-number-1'
        }
    }
}