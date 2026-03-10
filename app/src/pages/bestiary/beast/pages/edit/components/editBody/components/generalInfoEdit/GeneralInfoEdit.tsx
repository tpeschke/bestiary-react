import GeneralInfo from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import './GeneralInfoEdit.css'
import { UpdateGeneralInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateGeneralInfo'
import LinkedInfo from '@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces'
import PaletteDisplay from './components/Palette'
import TypeEdit from './components/TypeEdit'

interface Props {
    generalInfo: GeneralInfo,
    updateGeneralInfoFunctions: UpdateGeneralInfoFunctionsObject,
    linkedInfo: LinkedInfo
}

export default function GeneralInfoEdit({ generalInfo, updateGeneralInfoFunctions, linkedInfo }: Props) {
    const { updatePaletteInfo, updateLinkedInfo } = updateGeneralInfoFunctions
    const { palette } = generalInfo

    const { types } = linkedInfo

    return (
        <div className="main-info-edit">
            <TypeEdit types={types} updateLinkedInfo={updateLinkedInfo}/>
            <PaletteDisplay palette={palette} updatePaletteInfo={updatePaletteInfo} />
        </div>
    )
}