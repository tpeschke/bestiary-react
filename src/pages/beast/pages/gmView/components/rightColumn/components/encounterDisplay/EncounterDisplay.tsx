import './EncounterDisplay.css'

import Loading from "../../../../../../../../components/loading/Loading";
import Body from "../../../../../../components/UI/body/Body";
import NumberAppearingDisplay from "./components/NumberAppearingDisplay";
import ObjectivesDisplay from "./components/ObjectiveDisplay";
import SignDisplay from "./components/SignDisplay";
import TemperamentDisplay from "./components/TemperamentDisplay";
import TimeDisplay from "./components/TimeDisplay";
import VerbNounDisplay from "./components/VerbNounDisplay";
import encounterHooks from "./hooks/EncounterHooks";
import BattlefieldDisplay from './components/BattlefieldDisplay/BattlefieldDisplay';

interface Props {
}

export default function EncounterDisplay({ }: Props) {

    return (
        <>
            <h2 className='border'>Random Encounters</h2>
            <Loading component={EncounterShell} secondaryColor={true} />
        </>
    )
}

function EncounterShell(setLoading: Function) {
    const { encounterInfo } = encounterHooks();

    setLoading(encounterInfo)

    if (encounterInfo) {
        const { signs, group, objectives, verb, noun, temperament, time, battlefield } = encounterInfo

        return (
            <Body>
                <div className='encounter-display-shell'>
                    <SignDisplay signInfo={signs} />
                    <NumberAppearingDisplay groupInfo={group} />
                    <ObjectivesDisplay objectives={objectives} />
                    <VerbNounDisplay verb={verb} noun={noun} />
                    <div className="pair-shell encounter-display-pair">
                        <TemperamentDisplay temperamentInfo={temperament} />
                        <TimeDisplay time={time} />
                    </div>
                    <BattlefieldDisplay battlefieldInfo={battlefield} />
                </div>
            </Body>
        )
    }
}