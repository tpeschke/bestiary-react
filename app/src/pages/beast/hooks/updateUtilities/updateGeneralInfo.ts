import GeneralInfo from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import GMBeastClass from "../../models/gmBeastClass/GMBeastClass"
import { UpdateFunction } from "./interfaces/updateInterfaces"

export type UpdateGeneralInfoFunctionsObject = {
    updatePaletteInfo: UpdateFunction
}

export default function getUpdateGeneralInfoFunctions(
    beast: GMBeastClass | undefined, updateBeastInfo: Function
): UpdateGeneralInfoFunctionsObject {
    return {
        updatePaletteInfo: (key: string, value: string | number) => {
            if (beast) {
                let modifiedGeneralInfo: GeneralInfo = {
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
        }
    }
}