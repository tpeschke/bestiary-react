import { NonspecificGeneralInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { UpdateArrayFunction, UpdateFunction } from "./interfaces/updateInterfaces"
import LinkedInfo from "@bestiary/common/interfaces/beast/infoInterfaces/linkedInfoInterfaces"
import ImageInfo from "../../interfaces/infoInterfaces/ImageInfoInterfaces"

export type UpdateGeneralInfoFunctionsObject = {
    updatePaletteInfo: UpdateFunction,
    updateGeneralInfo: UpdateFunction,
    updateLinkedInfo: UpdateArrayFunction
    updateImageInfo: UpdateFunction
}

export default function getUpdateGeneralInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateGeneralInfoFunctionsObject {
    return {
        updateGeneralInfo: (key: string, value: string | number) => {
            if (beast) {
                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    generalInfo: {
                        ...beast.beastInfo.generalInfo,
                        [key]: value
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updatePaletteInfo: (key: string, value: string | number) => {
            if (beast) {
                let modifiedGeneralInfo: NonspecificGeneralInfo = {
                    ...beast.beastInfo.generalInfo,
                    palette: {
                        ...beast.beastInfo.generalInfo.palette,
                        [key]: value
                    }
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    generalInfo: modifiedGeneralInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateLinkedInfo: (key: string, value: any[]) => {
            if (beast) {
                let modifiedLinkedInfo: LinkedInfo = {
                    ...beast.linkedInfo,
                    [key]: value
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    linkedInfo: modifiedLinkedInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateImageInfo: (key: string, value: any[]) => {
            if (beast) {
                let modifiedImageInfo: ImageInfo = {
                    ...beast.imageInfo,
                    [key]: value
                }

                const modifiedBeastInfo: any = {
                    ...beast.beastInfo,
                    imageInfo: modifiedImageInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}