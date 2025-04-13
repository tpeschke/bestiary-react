import GeneralInfo from "../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces"
import ImageInfo from "../../../../interfaces/infoInterfaces.ts/ImageInfoInterfaces"
import SocialInfo from "../../../../interfaces/infoInterfaces.ts/socialInfo"

import FullImage from "../../../../components/fullImage/fullImage"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo, 
    generalInfo: GeneralInfo, 
    socialInfo: SocialInfo
}

export default function LeftColumn({ beastId, beastName, imageInfo, generalInfo, socialInfo }: Props) {
    console.log(imageInfo, generalInfo, socialInfo)
    return (
        <>
            <FullImage imageParam={beastId} altText={beastName}/>
        </>
    )
}