import { User } from "@bestiary/common/interfaces/userInterfaces"

export interface Request {
    app: App,
    user?: User | null,
    status: Function
}

export interface BasicParamsRequest extends Request {
    params: Parameters
}

interface App {
    get: Function
}

interface Parameters {
    beastId: any
    id: number,
    beastid: string,
}

export interface Response {
    get: Function,
    send: Function,
    sendFile: Function
}

export interface Error {
    message: string,
    status?: number
}

export interface Profile {
    displayName: string,
    user_id: string
}