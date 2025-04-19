import './htmlDisplay.css'

interface Props {
    html: string
}

export default function HTMLDisplay({ html }: Props) {
    return <div className="html-display-shell" dangerouslySetInnerHTML={{ __html: html }} />
}