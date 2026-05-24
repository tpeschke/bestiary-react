import Body from "../../../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../../../components/UI/htmlDisplay/htmlDisplay";
import { SystemOption } from "@bestiary/common/interfaces/beast/beast";
import { SystemInfoValue } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces";
import { getSystemInfoText } from "@bestiary/common/utilities/get/getSystemInfo";

interface Props {
    info?: SystemInfoValue,
    system?: SystemOption
}

export default function SpecialInfo({ info, system }: Props) {
    const html = getSystemInfoText(info, system)

    return (
        <>
            {html ?
                <Body>
                    <HTMLDisplay html={html} />
                </Body>
                :
                <></>
            }
        </>
    )
}