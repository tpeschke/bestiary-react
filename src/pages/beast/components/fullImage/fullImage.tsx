import './fullImage.css'

import { ArtistInfo } from '../../interfaces/infoInterfaces.ts/ImageInfoInterfaces'

import { imageBase } from '../../../../frontend-config'

interface Props {
    imageParam: number,
    altText: string,
    artistInfo: ArtistInfo
}

export default function FullImage({ imageParam, altText, artistInfo }: Props) {
    const { artist, tooltip, link } = artistInfo

    return (
        <>
            <img src={imageBase + imageParam} alt={altText}></img>
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