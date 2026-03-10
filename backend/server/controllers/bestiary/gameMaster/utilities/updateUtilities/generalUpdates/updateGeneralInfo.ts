import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import updatePalette from "./utilities/updatePalette"
import updateBasicGeneralInfo from "./utilities/updateBasicGeneralInfo"

export default async function updateGeneralInfo(beastID: number, generalInfo: GeneralInfo) {
    const { palette } = generalInfo

    let promiseArray: Promise<any>[] = [
        updateBasicGeneralInfo(beastID, generalInfo),
        updatePalette(beastID, palette)
    ]

    return Promise.all(promiseArray)
}