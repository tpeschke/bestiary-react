export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string
}