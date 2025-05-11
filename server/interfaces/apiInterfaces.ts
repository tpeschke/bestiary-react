export interface Request {
    app: App,
    params: Parameters,
    user: User,
    status: Function
}

interface App {
    get: Function
}

interface Parameters {
    beastId: any
    id: number,
    beastid: string,
    
}

export interface User {
    id: number,
    patreon?: number
}

export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string
}