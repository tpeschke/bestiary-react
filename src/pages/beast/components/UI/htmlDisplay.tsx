interface Props {
    html: string
}

export default function HTMLDisplay({ html }: Props) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
}