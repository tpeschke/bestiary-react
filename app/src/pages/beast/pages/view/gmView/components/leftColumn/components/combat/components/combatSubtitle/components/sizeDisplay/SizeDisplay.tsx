import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Pair from "../../../../../../../../../../../components/UI/pair/Pair"

interface Props {
    size: Size,
    knockback: number,
    noknockback: boolean
}

export default function SizeDisplay({ size, knockback, noknockback }: Props) {
    let knockbackString = `${knockback} `
    if (noknockback || !knockback) {
        knockbackString = `N `
    }

    size ? knockbackString += `(${size})` : null

    return (
        <Pair title="Knock-Back" info={knockbackString} format={{title: 'none', titleJustified: 'right'}} />
    )
}