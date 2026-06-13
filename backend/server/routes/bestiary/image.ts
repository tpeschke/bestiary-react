// @ts-ignore
import express from 'express'
import { Request, Response, Error } from '../../interfaces/apiInterfaces'
import { amazonImageBucket } from '../../server-config'
import axios from 'axios'
import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'
import { isOwner } from '../../utilities/ownerAccess'
import uploadMain from '../../controllers/bestiary/image/main'

const imageRoutes = express.Router()

interface ImageRequest extends Request {
    params: {
        imageSlug: string
    }
}

imageRoutes.get('/:imageSlug', async (request: ImageRequest, response: Response) => {
    const { imageSlug } = request.params
    const imageResult = await axios.get(amazonImageBucket + imageSlug).catch((error: Error) => error)

    checkForContentTypeBeforeSending(response, {
        hasImage: imageResult.status === 200
    })
})

interface UploadImageRequest extends Request {
    file: any,
}

imageRoutes.post('/update/:beastID', async (request: UploadImageRequest, response: Response) => {
    const { user } = request
    if (isOwner(user?.id)) {
        uploadMain.array('image', 1), (request: UploadImageRequest, response: Response) => {
            if (!request.file) {
                response.send({ message: 'Wrong file type, only upload JPEG and/or PNG', color: 'red' })
            } else {
                response.send({ image: request.file })
            }
        }
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You don't own this entry so can't edit it", type: 'message' })
    }
})

export default imageRoutes