export interface Request {
    app: App,
    params: Parameters,
    user: User
}

interface App {
    get: Function
}

interface Parameters {
    beastid: string
}

interface User {
    id: number,
    patreon: number
}

export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string
}