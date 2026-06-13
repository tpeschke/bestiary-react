import { ownerId, jeremyId } from "../server-config"
import { checkForContentTypeBeforeSending } from "./sendingFunctions"

export function isOwner(userId: number | undefined): boolean {
    return userId === ownerId || userId === jeremyId
}

export function isJustMainOwner(userId: number | null | undefined): boolean {
    if (!userId) { false }

    return userId === ownerId
}

export async function isOwnerMiddleware(request: any, response: any, next: Function) {
    const { user } = request
    if (isOwner(user?.id)) {
        next()
    } else {
        checkForContentTypeBeforeSending(response, { color: 'red', message: "You don't own this entry so can't edit it", type: 'message' })
    }
}