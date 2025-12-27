import '../EncounterDesign.css'

export default function TopHeader({ name }: { name: string }) {
    return (
        <div className='Name-Header'>
            <h1>{name}</h1>
        </div>
    )
}