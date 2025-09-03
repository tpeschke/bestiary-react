// @ts-ignore
import express from 'express'
import { Request, Response, Error } from '../interfaces/apiInterfaces'
import { amazonImageBucket } from '../server-config'
import axios from 'axios'
import { checkForContentTypeBeforeSending } from '../utilities/sendingFunctions'

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

export default imageRoutes