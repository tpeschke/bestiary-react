export default function formatHarvest(harvest: string, difficulty: string) {
    if (harvest.toUpperCase() === 'N/A') {
        return 'No Check Needed'
    } else if (harvest) {
        return `+${harvest}`
    } else {
        return `+${difficulty}`
    }
}