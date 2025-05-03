import Pair from "../../../../../../../../../../components/UI/pair/Pair"
import { Size } from "../../../../../../../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces"

interface Props {
    size: Size,
    knockback: number,
    noknockback: boolean
}

export default function SizeDisplay({ size, knockback, noknockback }: Props) {
    let knockbackString = `${knockback} `
    if (noknockback) {
        knockbackString = `N `
    }

    knockbackString += `(${size})`

    return (
        <Pair title="Knock-Back" info={knockbackString} format={{title: 'none', titleJustified: 'right'}} />
    )
}