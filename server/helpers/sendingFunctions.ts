import { Error, Response } from '../interfaces'

export const sendErrorForwardNoFile = ( fileName : string ) => {
    return (location : string, error : Error, response : Response) => {
        if (response) {
            checkForContentTypeBeforeSending(response, { color: 'red', message: error.message + ` (${location} - ${fileName})` })
        } else {
            console.log(fileName + ' ' + location + ' ~ ', error.message)
        }
    }
}

export const checkForContentTypeBeforeSending = (response : Response, body : Object) => {
    if (!response.get("content-type")) {
        response.send(body)
    }
}