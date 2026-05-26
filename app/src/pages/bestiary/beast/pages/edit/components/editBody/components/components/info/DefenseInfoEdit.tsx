import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import TextEditor from "../../../../../../../components/textEditor/textEditor"

interface Props {
    defenseInfo: SystemInfoValue,
    updateDefenseInfo: UpdateFunction,
    noHeader?: Boolean
}

export default function DefenseInfoEdit({ defenseInfo, updateDefenseInfo, noHeader = false }: Props) {
    const updateDefenseInfoForSystem = (system: 0 | 1 | 2, value: string) => {
        const newInfo = defenseInfo.map((info: string | undefined, index: number) => {
            if (system === index) {
                return value
            }
            return info
        })

        updateDefenseInfo('defenseInfo', newInfo)
    }

    return (
        <>
            {!noHeader && <h2 className="border">Defense Info</h2>}
            <div className="info-by-system-shell">
                <div>
                    <h3>Bonfire</h3>
                    <TextEditor content={defenseInfo[BONFIRE] ?? ''} captureCallBack={(value) => updateDefenseInfoForSystem(BONFIRE, value)} />
                </div>
                <div>
                    <h3>HackMaster</h3>
                    <TextEditor content={defenseInfo[HACKMASTER] ?? ''} captureCallBack={(value) => updateDefenseInfoForSystem(HACKMASTER, value)} />
                </div>
            </div>
        </>
    )
}