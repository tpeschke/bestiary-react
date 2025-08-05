import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import '../../SearchResults.css';
import { useNavigate } from 'react-router-dom';
import { copyLink } from '../../utilities/copyLink';
import Icon from '../../../../components/icon/Icon';
export default function SearchTopBar({ searchResults, navigateToRandomResult, sortingMethodInfo, sortingDirectionInfo }) {
    const navigate = useNavigate();
    const getRandomResultTooltip = 'Go to a random result in this list';
    const linkTooltip = 'Copy a link to these search parameters that goes directly to a random result in this list';
    function handleSortingClick(type) {
        if (type === sortingMethodInfo.sortingMethod) {
            sortingDirectionInfo.toggleDirection();
        }
        else {
            sortingMethodInfo.changeMethod(type);
        }
    }
    return (_jsxs("div", { className: 'result-info-shell', children: [_jsxs("span", { children: [_jsxs("h2", { children: ["Results: ", searchResults.length] }), searchResults.length === 25 && _jsx("p", { children: "(max: refine your search)" })] }), _jsxs("div", { className: 'result-sort-shell', children: [formatSortingOption(handleSortingClick, 'name', 'Name', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha'), _jsx("p", { children: "|" }), formatSortingOption(handleSortingClick, 'maxsocial', 'Confrontation', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number'), _jsx("p", { children: "|" }), formatSortingOption(handleSortingClick, 'maxcombat', 'Combat', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number'), _jsx("p", { children: "|" }), formatSortingOption(handleSortingClick, 'maxskill', 'Skill', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'number'), _jsx("p", { children: "|" }), formatSortingOption(handleSortingClick, 'rarity', 'Rarity', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha'), _jsx("p", { children: "|" }), formatSortingOption(handleSortingClick, 'size', 'Size', sortingMethodInfo.sortingMethod, sortingDirectionInfo.sortingDirection, 'alpha')] }), _jsxs("span", { children: [_jsx("button", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": getRandomResultTooltip, onClick: (_) => navigateToRandomResult(searchResults, navigate), children: _jsx(Icon, { iconName: 'dice', tooltip: getRandomResultTooltip, iconSize: 'h2' }) }), _jsxs("button", { "data-tooltip-id": "my-tooltip", "data-tooltip-content": linkTooltip, onClick: copyLink, children: [_jsx(Icon, { iconName: 'dice', tooltip: linkTooltip, margin: 'right', iconSize: 'h2' }), _jsx(Icon, { iconName: 'link', tooltip: linkTooltip, iconSize: 'h2' })] })] })] }));
}
function formatSortingOption(handleSortingClick, type, title, currentMethod, currentDirection, directionType) {
    const isActive = currentMethod === type;
    return (_jsxs("p", { className: isActive ? 'is-the-active-sort sort-option' : 'sort-option', onClick: _ => handleSortingClick(type), children: [title, isActive && _jsx(Icon, { iconName: findIcon(currentDirection, directionType), color: 'white', margin: 'left' })] }));
}
function findIcon(currentDirection, directionType) {
    if (currentDirection === 'asc') {
        if (directionType == 'alpha') {
            return 'direction-alphabet-z';
        }
        else {
            return 'direction-number-9';
        }
    }
    else {
        if (directionType == 'alpha') {
            return 'direction-alphabet-a';
        }
        else {
            return 'direction-number-1';
        }
    }
}
