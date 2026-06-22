import './Characteristics.css'

interface Props {
    capacity: number[]
}

export default function CapacityDisplay({ capacity }: Props) {
    const [no, noBut, yesBut, yes, yesAnd] = capacity

    return (
        <>
            <h3>Capacity</h3>
            <div className="body-shell capacity-display">
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'No And...'}>Na: &lt;{no -1}</p>
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'No'}>N: ≥{no}</p>
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'No But...'}>Nb: ≥{noBut}</p>
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'Yes But...'}>Yb: ≥{yesBut}</p>
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'Yes'}>Y: ≥{yes}</p>
                <p data-tooltip-id="my-tooltip" data-tooltip-content={'Yes And...'}>Ya: ≥{yesAnd}</p>
            </div>
        </>
    )
}