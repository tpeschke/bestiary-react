import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import TextEditor from "../../../../../../../components/textEditor/textEditor"

interface Props {
    attackInfo: SystemInfoValue,
    roleAttackInfo?: SystemInfoValue,
    updateAttackInfo: UpdateFunction,
    updateCombatInfo?: UpdateFunction,
    noHeader?: Boolean
}

export default function AttackInfoEdit({ attackInfo, roleAttackInfo, updateAttackInfo, updateCombatInfo, noHeader = false }: Props) {
    const updateInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        const newInfo = attackInfo.map((info: string | undefined, index: number) => {
            if (system === index) {
                return value
            }
            return info
        })

        updateAttackInfo('attackInfo', newInfo)
    }

    const updateRoleAttackInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        const newInfo = attackInfo.map((info: string | undefined, index: number) => {
            if (system === index) {
                return value
            }
            return info
        })

        if (updateCombatInfo) {
            updateCombatInfo('attackInfo', newInfo)
        }
    }

    return (
        <>
            {!noHeader && <h2 className="border">Attack Info</h2>}
            <div className="info-by-system-shell">
                <div>
                    <h3>Bonfire</h3>
                    <TextEditor content={attackInfo[BONFIRE] ?? ''} captureCallBack={(value) => updateInfoForSystem(BONFIRE, value)} />
                </div>
                <div>
                    <h3>HackMaster</h3>
                    <TextEditor content={attackInfo[HACKMASTER] ?? ''} captureCallBack={(value) => updateInfoForSystem(HACKMASTER, value)} />
                </div>
            </div>
            {roleAttackInfo && <div className="info-by-system-shell">
                <div>
                    <TextEditor content={roleAttackInfo[BONFIRE] ?? ''} captureCallBack={(value) => updateRoleAttackInfoForSystem(BONFIRE, value)} />
                </div>
                <div>
                    <TextEditor content={roleAttackInfo[HACKMASTER] ?? ''} captureCallBack={(value) => updateRoleAttackInfoForSystem(HACKMASTER, value)} />
                </div>
            </div>}
        </>
    )
}