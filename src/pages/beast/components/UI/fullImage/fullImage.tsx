import './fullImage.css'
import ImageNotFound from '../../../../../assets/images/404.png'

import { ArtistInfo } from '../../../interfaces/infoInterfaces/ImageInfoInterfaces'

import { imageBase } from '../../../../../frontend-config'

interface Props {
    imageParam: number,
    altText: string,
    artistInfo?: ArtistInfo
}

export default function FullImage({ imageParam, altText, artistInfo }: Props) {
    const link = artistInfo?.link
    const tooltip = artistInfo?.tooltip
    const artist = artistInfo?.artist

    function handleImageError({currentTarget}: any) {
        currentTarget.onerror = null
        currentTarget.src = ImageNotFound
    }

    return (
        <>
            <img src={imageBase + imageParam} alt={altText} onError={handleImageError}></img>
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