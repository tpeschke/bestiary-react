import { Beast } from "./beastInterfaces/viewInterfaces";

interface Props {
    beast: Beast
}

export default function GMView({ beast }: Props) {
    return (
        <>
            <h1>{beast.generalInfo.name}</h1>
            <p>GM View</p>
        </>
    )
}