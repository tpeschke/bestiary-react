export function processDR(drString) {
    let newDR = {
        flat: 0,
        slash: 0
    }

    if (drString) {
        drString.split('+').forEach(element => {
            if (element.includes('/d')) {
                newDR.slash = +element.split('/d')[0]
            } else {
                newDR.flat = +element
            }
        })
    }

    return newDR
}