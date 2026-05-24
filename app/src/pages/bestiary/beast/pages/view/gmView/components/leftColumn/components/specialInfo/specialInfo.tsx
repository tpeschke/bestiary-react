import Body from "../../../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../../../components/UI/htmlDisplay/htmlDisplay";
import { SystemOption } from "@bestiary/common/interfaces/beast/beast";

interface Props {
    info?: string,
}

export default function SpecialInfo({ info }: Props) {
    return (
        <>
            {info ?
                <Body>
                    <HTMLDisplay html={info} />
                </Body>
                :
                <></>
            }
        </>
    )
}