import './Checkbox.css'

interface Props {
    onClick: Function,
    label: string,
    tooltip?: string
}

export default function Checkbox({ onClick, label, tooltip }: Props) {

    function handleShellClick(event: any) {
        event.stopPropagation()

        let checkbox: any = document.getElementById(label)
        if (checkbox) {
            checkbox.checked = !checkbox.checked
        }

        onClick({
            ...event,
            stopPropagation: event.stopPropagation,
            target: { ...event.target, checked: checkbox.checked }
        })
    }

    return (
        <div className='checkbox-shell' onClick={handleShellClick} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
            <input type="checkbox" id={label} onClick={event => onClick(event)} />
            <p>{label}</p>
        </div>
    )
}