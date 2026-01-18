import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import Pair from "../../../../../../../../../../../components/UI/pair/Pair"

interface Props {
    size: Size,
    knockback: number,
    noKnockback: boolean
}

export default function SizeDisplay({ size, knockback, noKnockback }: Props) {
    let knockbackString = `${knockback} `
    if (noKnockback || !knockback) {
        knockbackString = `N `
    }

    size ? knockbackString += `(${size})` : null

    return (
        <Pair title="Knock-Back" info={knockbackString} format={{title: 'none', titleJustified: 'right'}} />
    )
}