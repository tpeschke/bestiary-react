import Loading from "../../../../../../../../components/loading/Loading";
import Body from "../../../../../../components/UI/body/Body";
import NumberAppearingDisplay from "./components/NumberAppearingDisplay";
import ObjectivesDisplay from "./components/ObjectiveDisplay";
import SignDisplay from "./components/SignDisplay";
import encounterHooks from "./hooks/EncounterHooks";

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
        const { signs, group, objectives } = encounterInfo

        // Verb
        // Noun
        // Temperament
        // Battlefield
        // Time
        // Lair

        return (
            <Body>
                <>
                    <SignDisplay signInfo={signs} />
                    <NumberAppearingDisplay groupInfo={group} />
                    <ObjectivesDisplay objectives={objectives} />
                </>
            </Body>
        )
    } else {
        return <></>
    }
}