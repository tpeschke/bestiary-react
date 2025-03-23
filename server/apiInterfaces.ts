export interface Request {
    app: App,
    params: Parameters,
    user: User,
    body: Body,
    sendStatus: Function,
    status: Function
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

interface Body {
    beastId: number, 
    noteId: number, 
    notes: string
}

export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string
}