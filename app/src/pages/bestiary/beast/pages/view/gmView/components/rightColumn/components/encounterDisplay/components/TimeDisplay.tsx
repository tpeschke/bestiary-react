import '../EncounterDisplay.css'

interface Props {
    time?: string
}

export default function TimeDisplay({ time }: Props) {
    if (!time) { return <></> }

    return (
        <div className='pair-shell'>
            <h3>Time</h3>
            <p>{time}</p>
        </div>
    )
}