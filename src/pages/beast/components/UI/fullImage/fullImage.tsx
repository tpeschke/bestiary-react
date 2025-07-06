import './fullImage.css'
import ImageNotFound from '../../../../../assets/images/404.png'

import { ArtistInfo } from '../../../interfaces/infoInterfaces/ImageInfoInterfaces'

import { imageBase } from '../../../../../frontend-config'

interface Props {
    imageParam: number,
    altText?: string,
    artistInfo?: ArtistInfo
    roleID?: string | null
}

export default function FullImage({ imageParam, altText, artistInfo, roleID = '' }: Props) {
    const link = artistInfo?.link
    const tooltip = artistInfo?.tooltip
    const artist = artistInfo?.artist

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null

        const roleImage = imageBase + imageParam + roleID
        const normalImage = imageBase + imageParam
        const notFoundImage = ImageNotFound

        if (currentTarget.src === roleImage) {
            currentTarget.src = normalImage
        } else if (currentTarget.src === normalImage) {
            currentTarget.src = notFoundImage
        }
    }

    return (
        <>
            <img src={imageBase + imageParam + roleID} alt={altText} onError={handleImageError}></img>
            <div className='artist-frame'>
                {link ?
                    <a target="_blank" href={link} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>{artist}</a>
                    :
                    <p data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>{artist}</p>
                }
            </div>
        </>
    )
}