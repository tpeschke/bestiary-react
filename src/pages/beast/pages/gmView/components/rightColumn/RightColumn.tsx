import './RightColumn.css'

import { Folklore, Scenario } from "../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces";

import Body from "../../../../components/UI/body/Body";
import HTMLDisplay from "../../../../components/UI/htmlDisplay/htmlDisplay";
import CommonFolklore from "./components/commonFolklore/CommonFolklore";
import InfoDisplay from "./components/infoDisplay/InfoDisplay";
import ScenarioDisplay from "./components/ScenariosDisplay/ScenarioDisplay";
import TypesDisplay from './components/typesDisplay/TypesDisplay';
import { BeastType, Variant } from '../../../../interfaces/infoInterfaces.ts/linkedInfoInterfaces';
import MiscInfoDisplay, { MiscInfo } from './components/miscInfoDisplay/MiscInfoDisplay';
import VariantsDisplay from './components/variantsDisplay/VariantsDisplay';

interface Props {
    intro: string
    appearance: string,
    habitat: string,
    folklores: Folklore[],
    scenarios: Scenario[],
    types: BeastType[],
    miscInfo: MiscInfo,
    variants: Variant[]
}

export default function RightColumn({ appearance, intro, habitat, folklores, scenarios, types, miscInfo, variants }: Props) {
    return (
        <div className='right-column-shell'>
            <Body>
                <HTMLDisplay html={intro} />
            </Body>
            <InfoDisplay section="Appearance" info={appearance} />
            <CommonFolklore folklores={folklores} />            
            <InfoDisplay section="Habitat / Society" info={habitat} />
            <ScenarioDisplay scenarios={scenarios} />
            <TypesDisplay types={types} />
            <MiscInfoDisplay miscInfo={miscInfo} />
            {/* Weird Pleroma and Shaping */}
            <VariantsDisplay variantsInfo={variants} />
            {/* Locations */}
        </div>
    )
}