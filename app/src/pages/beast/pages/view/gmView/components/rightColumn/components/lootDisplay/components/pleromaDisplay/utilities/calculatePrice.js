export default function calculatePrice(difficulty, harvest, rarityModifier) {
    if (difficulty?.toUpperCase() === 'N/A' && harvest?.toUpperCase() === 'N/A') {
        return 'Priceless';
    }
    if (!harvest && !difficulty) {
        difficulty = '1d0';
    }
    else if (!difficulty) {
        difficulty = harvest;
    }
    if (!harvest) {
        harvest = '1d0';
    }
    if (!rarityModifier) {
        rarityModifier = '1d0';
    }
    const totaledArray = [rarityModifier, ...harvest.split('+'), ...difficulty.split('+')];
    const totalPrice = totaledArray.reduce(collectAverage, 0);
    if (totalPrice <= 0) {
        return '0 sc';
    }
    return totalPrice + ' sc';
}
function collectAverage(total, value) {
    if (value === '0' || value.toUpperCase() === 'N/A') {
        return total;
    }
    if (value.substring(value.length - 1) === '!') {
        value = value.substring(0, value.length - 1);
    }
    const [number, maxDiceValue] = value.split('d');
    return total + ((number ? +number : 1) * (+maxDiceValue / 2));
}
