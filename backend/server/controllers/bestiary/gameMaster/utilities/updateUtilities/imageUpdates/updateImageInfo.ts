import updateBasicImageInfo from "./utilities/updateBasicImageInfo"
import ImageInfo from "@bestiary/common/interfaces/beast/infoInterfaces/ImageInfoInterfaces"

export default async function updateImageInfo(beastID: number, imageInfo: ImageInfo) {
    let promiseArray: Promise<any>[] = [
        updateBasicImageInfo(beastID, imageInfo),
    ]

    return Promise.all(promiseArray)
}