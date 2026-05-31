import '../EncounterDisplay.css'

interface Props {
    verb?: string,
    noun?: string
}

export default function VerbNounDisplay({ verb, noun }: Props) {
    if (!verb || !noun) { return <></> }

    return (
        <div className='pair-shell'>
            <h3>Verb - Noun</h3>
            <p>{verb} - {noun}</p>
        </div>
    )
}