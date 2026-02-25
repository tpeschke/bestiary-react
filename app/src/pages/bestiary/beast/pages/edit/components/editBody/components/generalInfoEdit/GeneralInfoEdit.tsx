import GeneralInfo from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import './GeneralInfoEdit.css'
import { UpdateGeneralInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateGeneralInfo'

interface Props {
    generalInfo: GeneralInfo,
    updateGeneralInfoFunctions: UpdateGeneralInfoFunctionsObject
}

export default function GeneralInfoEdit({ generalInfo, updateGeneralInfoFunctions }: Props) {
    const { palette } = generalInfo
    const { updatePaletteInfo } = updateGeneralInfoFunctions
    const { drives, needs, defenses, logistics, methods, groupDescriptions } = palette

    return (
        <div className="main-info-edit">
            <h2 className="border">Palette</h2>
            <h3>Drive(s)</h3>
            <input placeholder='Drive(s)' value={drives ? drives : ''} onChange={event => updatePaletteInfo('drives', event.target.value)} />
            <h3>Need(s)</h3>
            <input placeholder='Need(s)' value={needs ? needs : ''} onChange={event => updatePaletteInfo('needs', event.target.value)} />
            <h3>Defenses</h3>
            <input placeholder='Defenses' value={defenses ? defenses : ''} onChange={event => updatePaletteInfo('defenses', event.target.value)} />
            <h3>Logistics</h3>
            <input placeholder='Logistics' value={logistics ? logistics : ''} onChange={event => updatePaletteInfo('logistics', event.target.value)} />
            <h3>Methods</h3>
            <input placeholder='Methods' value={methods ? methods : ''} onChange={event => updatePaletteInfo('methods', event.target.value)} />
            <h3>Group Descriptions</h3>
            <input placeholder='Group Descriptions' value={groupDescriptions ? groupDescriptions : ''} onChange={event => updatePaletteInfo('groupDescriptions', event.target.value)} />
            <h3>Common Allies</h3>
            
        </div>
    )
}