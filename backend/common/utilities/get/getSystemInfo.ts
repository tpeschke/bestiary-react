import { SystemOption } from "../../interfaces/beast/beast"
import { SystemInfoValue } from "../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { BONFIRE, DND, HACKMASTER } from "./getSystemString"

type SystemInfoPreference = 0 | 1 | 2 | SystemOption | undefined

export function getSystemInfoText(info: SystemInfoValue, system?: SystemInfoPreference): string {
    if (!Array.isArray(info)) {
        return info ?? ''
    }

    const systemIndex = getSystemIndex(system)

    return info[systemIndex] ?? info[BONFIRE] ?? info[DND] ?? ''
}

export function getBonfireSystemInfo(info: SystemInfoValue): string {
    return getSystemInfoText(info, BONFIRE)
}

export function hasSystemInfoContent(info: SystemInfoValue, system?: SystemInfoPreference): boolean {
    return getSystemInfoText(info, system).trim().length > 0
}

export function updateBonfireSystemInfo(info: SystemInfoValue, value: string): SystemInfoValue {
    if (!Array.isArray(info)) {
        return value
    }

    return [
        value,
        info[DND],
        info[HACKMASTER]
    ]
}

function getSystemIndex(system?: SystemInfoPreference): 0 | 1 | 2 {
    if (typeof system === 'number') {
        return system
    }

    if (system === 'HackMaster') {
        return HACKMASTER
    }

    return BONFIRE
}
