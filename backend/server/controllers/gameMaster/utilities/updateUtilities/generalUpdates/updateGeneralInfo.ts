import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import updatePalette from "./utilities/updatePalette"

export default async function updateGeneralInfo(beastID: number, generalInfo: GeneralInfo) {
    const { palette } = generalInfo

    let promiseArray: Promise<any>[] = [
        updatePalette(beastID, palette)
    ]

    return Promise.all(promiseArray)
}