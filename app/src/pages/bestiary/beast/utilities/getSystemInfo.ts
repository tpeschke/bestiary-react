import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { BONFIRE, DND, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"

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

function getSystemIndex(system?: SystemInfoPreference): 0 | 1 | 2 {
    if (typeof system === 'number') {
        return system
    }

    if (system === 'HackMaster') {
        return HACKMASTER
    }

    return BONFIRE
}
