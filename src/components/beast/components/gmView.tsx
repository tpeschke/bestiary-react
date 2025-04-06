import GMBeastClass from "../models/GMBeastClass"

interface Props {
    beast: GMBeastClass
}

export default function GMView({ beast }: Props) {
    return (
        <>
            <h1>{beast.generalInfo.name}</h1>
            <p>GM View</p>
        </>
    )
}