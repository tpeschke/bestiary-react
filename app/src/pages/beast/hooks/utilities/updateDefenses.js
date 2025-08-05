export function shiftDefenseOrder(overAllIndex, overAllIndexToMoveTo, rawDefenses) {
    const defenseToMove = { ...rawDefenses[overAllIndex] };
    if (overAllIndex < overAllIndexToMoveTo) {
        // down
        return rawDefenses.reduce(resortDefensesDown(defenseToMove, overAllIndex, overAllIndexToMoveTo), []);
    }
    else if (overAllIndex > overAllIndexToMoveTo) {
        // up
        return rawDefenses.reduce(resortDefensesUp(defenseToMove, overAllIndex, overAllIndexToMoveTo), []);
    }
}
function resortDefensesDown(defenseToMove, overAllIndex, overAllIndexToMoveTo) {
    return (defenses, defense) => {
        const originalOverAllIndex = defense.overAllIndex;
        if (originalOverAllIndex !== overAllIndex) {
            defenses.push({
                ...defense,
                overAllIndex: defenses.length
            });
        }
        if (originalOverAllIndex === overAllIndexToMoveTo) {
            defenses.push({
                ...defenseToMove,
                overAllIndex: defenses.length
            });
        }
        return defenses;
    };
}
function resortDefensesUp(defenseToMove, overAllIndex, overAllIndexToMoveTo) {
    return (defenses, defense) => {
        const originalOverAllIndex = defense.overAllIndex;
        if (originalOverAllIndex === overAllIndexToMoveTo) {
            defenses.push({
                ...defenseToMove,
                overAllIndex: defenses.length
            });
        }
        if (originalOverAllIndex !== overAllIndex) {
            defenses.push({
                ...defense,
                overAllIndex: defenses.length
            });
        }
        return defenses;
    };
}
