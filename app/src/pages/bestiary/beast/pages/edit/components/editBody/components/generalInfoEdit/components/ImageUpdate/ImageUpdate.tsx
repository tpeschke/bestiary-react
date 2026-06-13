import { imageBase, imageURL, thumbnailImageBase } from '../../../../../../../../../../../frontend-config'
import FullImage from '../../../../../../../../components/UI/fullImage/fullImage'
import './ImageUpdate.css'
import ImageNotFound from '../../../../../../../../../../../assets/images/404.png'
import axios from 'axios'
import { useState } from 'react'

interface Props {
    beastID: number,
    roleID: string,
    hasRoles: boolean
}

export default function ImageUpdate({ beastID, roleID, hasRoles }: Props) {
    const [timeStamp, setTimeStamp] = useState(Date.now())

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
                    {/* change catalog image position */}
                    <button>Placeholder</button>


                    <div className='image-frame'>
                        {/* objectPosition needs to be positioned */}
                        <img src={thumbnailImageBase + 'thumbnail-' + beastID} style={{ 'objectPosition': 'top' }} onError={handleCatalogImageError}></img>
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