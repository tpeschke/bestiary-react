import './fullImage.css'
import ImageNotFound from '../../../../../../assets/images/404.png'

import { ArtistInfo } from '../../../interfaces/infoInterfaces/ImageInfoInterfaces'

import { imageBase, imageURL } from '../../../../../../frontend-config'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {
    imageParam: number,
    altText?: string,
    artistInfo?: ArtistInfo
    roleID?: string | null,
    addTimeStamp?: boolean
}

export default function FullImage({ imageParam, altText, artistInfo, roleID = '', addTimeStamp }: Props) {
    const [hasRoleArt, setHasRoleArt] = useState(false)

    const link = artistInfo?.link
    const tooltip = artistInfo?.tooltip
    const artist = artistInfo?.artist

    const roleImage = imageBase + imageParam + roleID + (addTimeStamp ? `?t=${Date.now()}` : '')
    const normalImage = imageBase + imageParam + (addTimeStamp ? `?t=${Date.now()}` : '')
    const notFoundImage = ImageNotFound

    useEffect(() => {
        axios.get(imageURL + imageParam + roleID).then(({data}) => setHasRoleArt(data.hasImage))
    }, [roleID])

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null

        if (currentTarget.src === roleImage) {
            currentTarget.src = normalImage
        } else if (currentTarget.src === normalImage) {
            currentTarget.src = notFoundImage
        }
    }

    return (
        <>
            <img src={hasRoleArt ? roleImage : normalImage} alt={altText} onError={handleImageError}></img>
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