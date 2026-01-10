import './GeneralInfoEdit.css'

interface Props {

}

export default function GeneralInfoEdit({ }: Props) {
    return (
        <div className="main-info-edit">
            <h2 className="border">Palette</h2>
            <h3>Drive(s)</h3>
            <input placeholder='Drive(s)' />
            <h3>Need(s)</h3>
            <input placeholder='Need(s)' />
            <h3>Defenses</h3>
            <input placeholder='Defenses' />
            <h3>Logistics</h3>
            <input placeholder='Logistics' />
            <h3>Methods</h3>
            <input placeholder='Methods' />
            <h3>Group Descriptions</h3>
            <input placeholder='Group Descriptions' />
        </div>
    )
}