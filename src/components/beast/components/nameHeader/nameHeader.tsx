import './nameHeader.css'

interface Props {
    name: string
}

export default function NameHeader({ name }: Props) {
    return (
        <div className='Name-Header'>
            <h1>{name}</h1>
        </div>
    )
}