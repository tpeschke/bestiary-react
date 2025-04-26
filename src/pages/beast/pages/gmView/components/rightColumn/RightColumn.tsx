import Body from "../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../components/UI/htmlDisplay/htmlDisplay";
import { Folklore } from "../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces";
import CommonFolklore from "./components/commonFolklore/CommonFolklore";
import InfoDisplay from "./components/infoDisplay/InfoDisplay";

interface Props {
    intro: string
    appearance: string,
    habitat: string,
    folklores: Folklore[]
}

export default function RightColumn({ appearance, intro, habitat, folklores }: Props) {
    return (
        <>
            <Body>
                <HTMLDisplay html={intro} />
            </Body>
            <InfoDisplay section="Appearance" info={appearance} />
            <CommonFolklore folklores={folklores} />            
            <InfoDisplay section="Habitat / Society" info={habitat} />
        </>
    )
}