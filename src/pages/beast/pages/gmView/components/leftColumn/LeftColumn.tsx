import ImageInfo from "../../../../interfaces/infoInterfaces.ts/ImageInfoInterfaces"
import SocialInfo from "../../../../interfaces/infoInterfaces.ts/socialInfo"

import FullImage from "../../../../components/fullImage/fullImage"
import Confrontation from "./components/Confrontation"

interface Props {
    beastId: number,
    beastName: string,
    imageInfo: ImageInfo, 
    socialInfo: SocialInfo
}

export default function LeftColumn({ beastId, beastName, imageInfo, socialInfo }: Props) {
    return (
        <>
            <FullImage imageParam={beastId} altText={beastName} artistInfo={imageInfo.artistInfo?.genericArtistInfo}/>
            <Confrontation socialInfo={socialInfo} />
        </>
    )
}