import './RightColumn.css'

import { Folklore, Scenario } from "../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces";

import Body from "../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../components/UI/htmlDisplay/htmlDisplay";
import CommonFolklore from "./components/commonFolklore/CommonFolklore";
import InfoDisplay from "./components/infoDisplay/InfoDisplay";
import ScenarioDisplay from "./components/ScenariosDisplay/ScenarioDisplay";

interface Props {
    intro: string
    appearance: string,
    habitat: string,
    folklores: Folklore[],
    scenarios: Scenario[]
}

export default function RightColumn({ appearance, intro, habitat, folklores, scenarios }: Props) {
    return (
        <>
            <Body>
                <HTMLDisplay html={intro} />
            </Body>
            <InfoDisplay section="Appearance" info={appearance} />
            <CommonFolklore folklores={folklores} />            
            <InfoDisplay section="Habitat / Society" info={habitat} />
            <ScenarioDisplay scenarios={scenarios} />
        </>
    )
}