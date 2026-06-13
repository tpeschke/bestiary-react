import { NonspecificGeneralInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import './GeneralInfoEdit.css'
import { UpdateGeneralInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateGeneralInfo'
import LinkedInfo from '@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces'
import PaletteDisplay from './components/Palette'
import TypeEdit from './components/TypeEdit'
import AppearanceEdit from './components/Appearance'
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'
import ImageUpdate from './components/ImageUpdate/ImageUpdate'

export interface EditImageInfo {
    beastID: number,
    roleID: string,
    hasRoles: boolean
}

interface Props {
    imageInfo: EditImageInfo
    generalInfo: NonspecificGeneralInfo,
    updateGeneralInfoFunctions: UpdateGeneralInfoFunctionsObject,
    linkedInfo: LinkedInfo
}

export default function GeneralInfoEdit({ imageInfo, generalInfo, updateGeneralInfoFunctions, linkedInfo }: Props) {
    const { updateGeneralInfo, updatePaletteInfo, updateLinkedInfo, updateImageInfo } = updateGeneralInfoFunctions
    const { palette, appearance } = generalInfo

    const { types } = linkedInfo

    return (
        <div className="main-info-edit">
            <ImageUpdate {...imageInfo} updateImageInfo={updateImageInfo} />
            <AppearanceEdit updateGeneralInfo={updateGeneralInfo} appearance={appearance[BONFIRE]} />
            <TypeEdit types={types} updateLinkedInfo={updateLinkedInfo} />
            <PaletteDisplay palette={palette} updatePaletteInfo={updatePaletteInfo} />
        </div>
    )
}