import { NonspecificGeneralInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { BeastInfo } from "../../interfaces/viewInterfaces"
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
    beastInfo: BeastInfo | undefined, _roleId: string | null, updateBeastInfo: Function
): UpdateGeneralInfoFunctionsObject {
    return {
        updateGeneralInfo: (key: string, value: string | number) => {
            if (beastInfo) {
                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    generalInfo: {
                        ...beastInfo.generalInfo,
                        [key]: value
                    }
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updatePaletteInfo: (key: string, value: string | number) => {
            if (beastInfo) {
                let modifiedGeneralInfo: NonspecificGeneralInfo = {
                    ...beastInfo.generalInfo,
                    palette: {
                        ...beastInfo.generalInfo.palette,
                        [key]: value
                    }
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    generalInfo: modifiedGeneralInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateLinkedInfo: (key: string, value: any[]) => {
            if (beastInfo) {
                let modifiedLinkedInfo: LinkedInfo = {
                    ...beastInfo.linkedInfo,
                    [key]: value
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    linkedInfo: modifiedLinkedInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        },
        updateImageInfo: (key: string, value: any[]) => {
            if (beastInfo) {
                let modifiedImageInfo: ImageInfo = {
                    ...beastInfo.imageInfo,
                    [key]: value
                }

                const modifiedBeastInfo: any = {
                    ...beastInfo,
                    imageInfo: modifiedImageInfo
                }

                updateBeastInfo(modifiedBeastInfo)
            }
        }
    }
}
