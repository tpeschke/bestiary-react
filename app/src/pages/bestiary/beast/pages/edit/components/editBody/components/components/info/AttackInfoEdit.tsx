import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import TextEditor from "../../../../../../../components/textEditor/textEditor"

const EMPTY_SYSTEM_INFO: SystemInfoValue = ['', undefined, '']

interface Props {
    attackInfo: SystemInfoValue | null,
    roleAttackInfo?: SystemInfoValue | null,
    statKey?: string,
    updateAttackInfo: UpdateFunction,
    updateCombatInfo?: UpdateFunction,
    noHeader?: Boolean
}

export default function AttackInfoEdit({ attackInfo, roleAttackInfo, updateAttackInfo, updateCombatInfo, statKey = 'attackInfo', noHeader = false }: Props) {
    const safeAttackInfo = attackInfo ?? EMPTY_SYSTEM_INFO

    const updateInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        const newInfo = safeAttackInfo.map((info: string | undefined, index: number) => {
            if (system === index) {
                return value
            }
            return info
        })

        updateAttackInfo(statKey, newInfo)
    }

    const updateRoleAttackInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        if (roleAttackInfo) {
            const newInfo = roleAttackInfo.map((info: string | undefined, index: number) => {
                if (system === index) {
                    return value
                }
                return info
            })

            if (updateCombatInfo) {
                updateCombatInfo(statKey, newInfo)
            }
        }
    }

    return (
        <>
            {!noHeader && <h2 className="border">Attack Info</h2>}
            <div className="info-by-system-shell" key={safeAttackInfo[BONFIRE] + 'BONFIRE'}>
                <div>
                    <h3>Bonfire</h3>
                    <TextEditor content={safeAttackInfo[BONFIRE] ?? ''} captureCallBack={(value) => updateInfoForSystem(BONFIRE, value)} />
                </div>
                <div key={safeAttackInfo[HACKMASTER] + 'HACKMASTER'}>
                    <h3>HackMaster</h3>
                    <TextEditor content={safeAttackInfo[HACKMASTER] ?? ''} captureCallBack={(value) => updateInfoForSystem(HACKMASTER, value)} />
                </div>
            </div>
            {roleAttackInfo && <div className="info-by-system-shell">
                <div key={roleAttackInfo[BONFIRE] + 'BONFIRE'}>
                    <TextEditor content={roleAttackInfo[BONFIRE] ?? ''} captureCallBack={(value) => updateRoleAttackInfoForSystem(BONFIRE, value)} />
                </div>
                <div key={roleAttackInfo[HACKMASTER] + 'HACKMASTER'}>
                    <TextEditor content={roleAttackInfo[HACKMASTER] ?? ''} captureCallBack={(value) => updateRoleAttackInfoForSystem(HACKMASTER, value)} />
                </div>
            </div>}
        </>
    )
}