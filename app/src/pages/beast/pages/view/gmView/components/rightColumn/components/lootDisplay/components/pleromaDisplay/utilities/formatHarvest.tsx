export default function formatHarvest(harvest: string | null, difficulty: string, modifier: string | undefined) {
    if (harvest?.toUpperCase() === 'N/A') {
        return 'No Check Needed'
    } else if (harvest) {
        return `+${harvest}`
    } else {
        return `${modifier} ${difficulty}`
    }
}