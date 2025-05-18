interface Props {
    info: string
}

export default function GenericLootDisplay({ info }: Props) {
    return <li>{info}</li>
}