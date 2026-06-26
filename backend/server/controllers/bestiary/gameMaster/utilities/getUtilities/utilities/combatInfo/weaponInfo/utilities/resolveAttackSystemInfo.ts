import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { buildSystemSpecificInfo } from "../../../../../formatUtilities/getSystemSpecificTerminologies"

interface AttackInfoSource {
    info?: string | null,
    info_hm?: string | null,
    attackinfo?: string | null,
    attackinfo_hm?: string | null,
}

export default function resolveAttackSystemInfo({
    info: infoBonfire,
    info_hm: infoHm,
    attackinfo,
    attackinfo_hm: attackinfoHm,
}: AttackInfoSource): SystemInfoValue {
    if (attackinfo) {
        return attackinfoHm
            ? [attackinfo, undefined, attackinfoHm]
            : buildSystemSpecificInfo(attackinfo)
    }

    if (infoHm) {
        return [infoBonfire ?? '', undefined, infoHm ?? '']
    }

    return buildSystemSpecificInfo(infoBonfire)
}
