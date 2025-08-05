export default function sortResults(sortingMethod, sortingDirection) {
    if (['maxcombat', 'maxsocial', 'maxskill'].includes(sortingMethod)) {
        return sortByNumber(sortingMethod, sortingDirection);
    }
    else if (sortingMethod === 'name') {
        return sortByAlphabet(sortingMethod, sortingDirection);
    }
    else if (sortingMethod === 'size') {
        return sortBySize(sortingDirection);
    }
    else if (sortingMethod === 'rarity') {
        return sortByRarity(sortingDirection);
    }
    return (a, b) => a.id - b.id;
}
function sortByRarity(sortingDirection) {
    return (a, b) => {
        if (sortingDirection === 'dsc') {
            if (a.rarity.rarityId < b.rarity.rarityId) {
                return -1;
            }
            else if (a.rarity.rarityId > b.rarity.rarityId) {
                return 1;
            }
        }
        else {
            if (a.rarity.rarityId < b.rarity.rarityId) {
                return 1;
            }
            else if (a.rarity.rarityId > b.rarity.rarityId) {
                return -1;
            }
        }
        return 0;
    };
}
function sortByNumber(sortingMethod, sortingDirection) {
    return (a, b) => {
        if (sortingDirection === 'dsc') {
            if (a[sortingMethod] < b[sortingMethod]) {
                return -1;
            }
            else if (a[sortingMethod] > b[sortingMethod]) {
                return 1;
            }
        }
        else {
            if (a[sortingMethod] < b[sortingMethod]) {
                return 1;
            }
            else if (a[sortingMethod] > b[sortingMethod]) {
                return -1;
            }
        }
        return 0;
    };
}
function sortByAlphabet(sortingMethod, sortingDirection) {
    return (a, b) => {
        const upperA = a[sortingMethod].toUpperCase();
        const upperB = b[sortingMethod].toUpperCase();
        if (sortingDirection === 'dsc') {
            if (upperA < upperB) {
                return -1;
            }
            else if (upperA > upperB) {
                return 1;
            }
        }
        else {
            if (upperA < upperB) {
                return 1;
            }
            else if (upperA > upperB) {
                return -1;
            }
        }
        return 0;
    };
}
function sortBySize(sortingDirection) {
    return (a, b) => {
        const listToSortBy = ['Fine', 'Diminutive', 'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Giant', 'Enormous', 'Colossal'];
        const aIndex = listToSortBy.indexOf(a.size);
        const bIndex = listToSortBy.indexOf(b.size);
        if (sortingDirection === 'dsc') {
            if (aIndex < bIndex) {
                return -1;
            }
            else if (aIndex > bIndex) {
                return 1;
            }
        }
        else {
            if (aIndex < bIndex) {
                return 1;
            }
            else if (aIndex > bIndex) {
                return -1;
            }
        }
        return 0;
    };
}
