export interface Profile {
    displayName: string,
    user_id: string
}

export interface User {
    id: number,
    patreon: number
}

export interface Request {
    user: User
}

export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string
}