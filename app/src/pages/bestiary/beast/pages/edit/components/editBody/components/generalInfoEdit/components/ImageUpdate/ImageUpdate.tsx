import { imageBase, imageURL, thumbnailImageBase } from '../../../../../../../../../../../frontend-config'
import FullImage from '../../../../../../../../components/UI/fullImage/fullImage'
import './ImageUpdate.css'
import ImageNotFound from '../../../../../../../../../../../assets/images/404.png'
import axios from 'axios'
import { useState } from 'react'
import { UpdateFunction } from '../../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces'

interface Props {
    beastID: number,
    roleID: string,
    hasRoles: boolean,
    thumbnail?: string,
    updateImageInfo: UpdateFunction
}

export default function ImageUpdate({ beastID, roleID, hasRoles, thumbnail, updateImageInfo }: Props) {
    const [timeStamp, setTimeStamp] = useState(Date.now())

    const objectPositionOptions = [
        'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right'
    ]

    const roleImage = imageBase + beastID + roleID + '-token'
    const normalImage = imageBase + beastID + '-token'
    const notFoundImage = ImageNotFound

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null

        if (currentTarget.src === roleImage) {
            currentTarget.src = normalImage
        } else if (currentTarget.src === normalImage) {
            currentTarget.src = notFoundImage
        }
    }

    function handleCatalogImageError({ currentTarget }: any) {
        currentTarget.onerror = null
        if (currentTarget.src === thumbnailImageBase + 'thumbnail-' + beastID) {
            currentTarget.src = imageBase + beastID
        } else {
            currentTarget.src = ImageNotFound
        }
    }

    async function onMainImagePicked(event: any): Promise<void> {
        const files = (event?.target as HTMLInputElement).files
        if (files) {
            const [FILE] = files;
            const imageForm = new FormData();
            imageForm.append('image', FILE);

            await axios.post(imageURL + 'update/' + beastID, imageForm)
            setTimeStamp(Date.now())
        }
    }

    async function onTokenImagePicked(event: any): Promise<void> {
        const files = (event?.target as HTMLInputElement).files
        if (files) {
            const [FILE] = files;
            const imageForm = new FormData();
            imageForm.append('image', FILE);

            axios.post(imageURL + 'update/' + beastID + '-token', imageForm)
            setTimeStamp(Date.now())
        }
    }

    return (
        <div className='image-update-shell'>
            <div>
                <h2>Main Image</h2>

                <FullImage imageParam={beastID} timeStamp={timeStamp} />
                <input id="file-upload" type="file" onChange={onMainImagePicked} data-tooltip-id="my-tooltip" data-tooltip-content="10 MB limit" />

                <div className='catalog-preview'>
                    <select value={thumbnail} onChange={event => updateImageInfo('thumbnail', event.target.value)}>
                        {objectPositionOptions.map(position => <option value={position} key={position}>{position}</option>)}
                    </select>

                    <div className='image-frame'>
                        <img src={thumbnailImageBase + 'thumbnail-' + beastID} style={{ 'objectPosition': thumbnail ?? 'top' }} onError={handleCatalogImageError}></img>
                    </div>
                </div>

                <div className='catalog-preview'>
                    <div>
                        <h3>Token</h3>
                        <input id="file-upload" type="file" onChange={onTokenImagePicked} data-tooltip-id="my-tooltip" data-tooltip-content="10 MB limit" />
                    </div>

                    <img src={imageBase + beastID + '-token' + `?t=${timeStamp}`} alt={'token'} onError={handleImageError}></img>
                </div>
            </div>
            <div>
                {hasRoles && (
                    <>
                        <h3>Role Image</h3>
                        <FullImage imageParam={beastID} roleID={roleID} timeStamp={timeStamp} />
                        {/* upload image */}
                    </>
                )}
            </div>

        </div>
    )
}