import Body from "../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../components/UI/htmlDisplay/htmlDisplay";
import InfoDisplay from "./components/infoDisplay/InfoDisplay";

interface Props {
    appearance: string,
    intro: string
}

export default function RightColumn({ appearance, intro }: Props) {
    return (
        <>
            <Body>
                <HTMLDisplay html={intro} />
            </Body>
            <InfoDisplay section="Appearance" info={appearance} />
        </>
    )
}