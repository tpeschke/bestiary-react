import Body from "../../../../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../../../../components/UI/htmlDisplay/htmlDisplay";

interface Props {
    info?: string,
}

export default function SpecialInfo({ info }: Props) {
    return (
        <>
            {(info && info !== '<p></p>') ?
                <Body>
                    <HTMLDisplay html={info} />
                </Body>
                :
                <></>
            }
        </>
    )
}