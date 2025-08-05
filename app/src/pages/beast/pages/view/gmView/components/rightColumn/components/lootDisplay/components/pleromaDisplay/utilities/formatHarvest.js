export default function formatHarvest(harvest, difficulty) {
    if (harvest?.toUpperCase() === 'N/A') {
        return 'No Check Needed';
    }
    else if (harvest) {
        return `+${harvest}`;
    }
    else {
        return `+${difficulty}`;
    }
}
