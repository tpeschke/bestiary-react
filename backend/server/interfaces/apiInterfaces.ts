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

export interface KofiInfo {
    verification_token: string,
    message_id: string,
    timestamp: string,
    type: "Subscription",
    is_public: Boolean,
    from_name: string,
    message: string,
    amount: string, // "3.00" 
    url: string,
    email: string,
    currency: "USD",
    is_subscription_payment: Boolean,
    is_first_subscription_payment: Boolean,
    kofi_transaction_id: string,
    shop_items: string | null,
    tier_name: 'Game Master' | 'Early Access' | null,
    shipping: string | null,
    discord_username: string,
    discord_userid: string
}
