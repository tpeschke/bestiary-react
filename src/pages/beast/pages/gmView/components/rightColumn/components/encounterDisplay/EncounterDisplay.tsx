import Loading from "../../../../../../../../components/loading/Loading";
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
        const { signs } = encounterInfo

        // Number Appearing
        // Objectives
        // Verb
        // Noun
        // Temperament
        // Battlefield
        // Time
        // Lair

        return (
            <>
                <SignDisplay signInfo={signs} />
            </>
        )
    } else {
        return <></>
    }
}