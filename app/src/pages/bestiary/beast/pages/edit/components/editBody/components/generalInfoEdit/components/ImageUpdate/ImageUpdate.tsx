import { imageBase, thumbnailImageBase } from '../../../../../../../../../../../frontend-config'
import FullImage from '../../../../../../../../components/UI/fullImage/fullImage'
import './ImageUpdate.css'
import ImageNotFound from '../../../../../../../../../../../assets/images/404.png'
import TileIcon from '../../../../../../../../../catalog/components/tile/components/TileIcon'

interface Props {
    beastID: number,
    roleID: string,
    hasRoles: boolean
}

export default function ImageUpdate({ beastID, roleID, hasRoles }: Props) {

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

    return (
        <div className='image-update-shell'>
            <div>
                <h2>Main Image</h2>

                <FullImage imageParam={beastID} addTimeStamp={true} />
                <button>Upload Main Image</button>

                <div className='catalog-preview'>
                {/* change catalog image position */}
                    <button>Placeholder Button</button>
                    <div className='image-frame'>
                        {/* objectPosition needs to be positioned */}
                        <img src={thumbnailImageBase + 'thumbnail-' + beastID} style={{ 'objectPosition': 'top' }} onError={handleCatalogImageError}></img>
                    </div>
                </div>
            </div>
            <div>
                {hasRoles && (
                    <>
                        <h3>Role Image</h3>
                        <FullImage imageParam={beastID} roleID={roleID} addTimeStamp={true} />
                        {/* upload image */}
                    </>
                )}
            </div>
            <div>
                <h2>Token</h2>
                <img src={hasRoles ? roleImage : normalImage} alt={'token'} onError={handleImageError}></img>
                <button>Upload Token Image</button>
            </div>
        </div>
    )
}