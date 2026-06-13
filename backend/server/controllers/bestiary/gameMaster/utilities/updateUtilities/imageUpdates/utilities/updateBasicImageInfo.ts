import query from "../../../../../../../db/database";
import ImageInfo from "@bestiary/common/interfaces/beast/infoInterfaces/ImageInfoInterfaces";

const updateImageInfoSQL = `update bbIndividualBeast 
set thumbnail = $2
where id = $1`

export default async function updateBasicImageInfo(beastID: number, imageInfo: ImageInfo) {
    const { thumbnail } = imageInfo

    return query(updateImageInfoSQL, [beastID, thumbnail])
}