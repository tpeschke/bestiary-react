export default function formatDRString(staticDR: number, slashDR: string): string {
    let drString = '';

    if (staticDR > 0) {
        drString = `${staticDR}`
    }

    if (slashDR !== '0') {
        if (drString !== '') {
            drString += ' +'
        }
        drString += `${slashDR}`
    }

    if (drString === '') { return '0' }
    return drString
}
