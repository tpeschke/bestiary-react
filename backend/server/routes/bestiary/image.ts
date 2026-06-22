// @ts-ignore
import express from 'express'
import { Request, Response, Error } from '../../interfaces/apiInterfaces'
import { amazonImageBucket } from '../../server-config'
import axios from 'axios'
import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'
import uploadMain from '../../controllers/bestiary/image/main'
import { isOwnerMiddleware } from '../../utilities/ownerAccess'
import query from '../../db/database'

const imageRoutes = express.Router()

interface ImageRequest extends Request {
    params: {
        imageSlug: string
    }
}

imageRoutes.get('/:imageSlug', async (request: ImageRequest | any, response: Response) => {
    const { imageSlug } = request.params
    const imageResult = await axios.get(amazonImageBucket + imageSlug).catch((error: Error) => error)

    checkForContentTypeBeforeSending(response, {
        hasImage: imageResult.status === 200
    })
})

interface UploadImageRequest extends Request {
    file: any,
}

const updateToGoran = `update bbBeastArtist b
set artistID = 1
where beastID = $1 and roleID is null`

const tokenEnding = '-token'

const deleteRoleSpecificArt = `delete from bbBeastArtist
where beastID = $1 and roleID is not null`

imageRoutes.post('/update/:beastID', isOwnerMiddleware, uploadMain.array('image', 1), async (request: UploadImageRequest | any, response: Response) => {
    if (!request.file) {
        response.send({ message: 'Wrong file type, only upload JPEG and/or PNG', color: 'red' })
    } else {
        const { beastID } = request.params

        if (!isNaN(+beastID)) {
            await query(updateToGoran, +beastID)
        } else if (beastID.substring(beastID.length - tokenEnding.length) !== tokenEnding) {
            await query(deleteRoleSpecificArt, +beastID)
        }
        response.send({ image: request.file })
    }
})

export default imageRoutes