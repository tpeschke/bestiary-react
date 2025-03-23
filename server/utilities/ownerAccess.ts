import { ownerId, jeremyId } from "../server-config"

export function isOwner(userId : number) : boolean {
    return userId === ownerId || userId === jeremyId
}

export function isJustMainOwner(userId : number) : boolean {
    return userId === ownerId
}