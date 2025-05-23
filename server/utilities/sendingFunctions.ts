import { Error, Response } from '../interfaces/apiInterfaces'

export const sendErrorForwardNoFile = ( fileName : string ) => {
    return (location : string, error : Error, response : Response) => {
        if (response) {
            checkForContentTypeBeforeSending(response, { color: 'red', message: error.message + ` (${location} - ${fileName})`, type: 'message' })
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

export const consoleLogErrorNoFile = (file) => {
    return (location, error) => {
        console.log(file + ' ' + location + ' ~ ', error.message)
    }
}