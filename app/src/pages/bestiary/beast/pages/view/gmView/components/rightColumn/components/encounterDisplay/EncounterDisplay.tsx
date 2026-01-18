import './EncounterDisplay.css'

import NumberAppearingDisplay from "./components/NumberAppearingDisplay";
import ObjectivesDisplay from "./components/ObjectiveDisplay";
import SignDisplay from "./components/SignDisplay";
import TemperamentDisplay from "./components/TemperamentDisplay";
import TimeDisplay from "./components/TimeDisplay";
import VerbNounDisplay from "./components/VerbNounDisplay";
import encounterHooks from "./hooks/EncounterHooks";
import BattlefieldDisplay from './components/BattlefieldDisplay/BattlefieldDisplay';
import ComplicationDisplay from './components/ComplicationDisplay/ComplicationDisplay';
import { useEffect } from 'react';
import Icon from '../../../../../../../../../../components/icon/Icon';
import Loading, { SetLoadingFunction } from '../../../../../../../../../../components/loading/Loading';
import Body from '../../../../../../../components/UI/body/Body';

interface Props {
}

export default function EncounterDisplay({ }: Props) {

    return (
        <>
            <h2 className='border'>Random Encounters</h2>
            <Loading secondary={true}>
                <EncounterShell />
            </Loading>

        </>
    )
}

interface Props {
    setLoading?: SetLoadingFunction
}

function EncounterShell({ setLoading }: Props) {
    const { encounterInfo, generateEncounter } = encounterHooks();

    useEffect(() => {
        if (setLoading) {
            setLoading(!!encounterInfo)
        }
    }, [setLoading, encounterInfo])

    if (encounterInfo) {
        const { signs, group, objectives, verb, noun, temperament, time, battlefield, complications } = encounterInfo

        return (
            <>
                {signs.beastSign?.sign ?
                    <>
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
                                <ComplicationDisplay complications={complications} />
                            </div>
                        </Body>
                        <div className='encounter-input-shell'>
                            <button onClick={_ => generateEncounter()}><Icon iconName='redo' /></button>
                        </div>
                    </>
                    :
                    <Body>
                        <p className='italic'>This Entry Has No Random Encounters</p>
                    </Body>
                }
            </>
        )
    }
}