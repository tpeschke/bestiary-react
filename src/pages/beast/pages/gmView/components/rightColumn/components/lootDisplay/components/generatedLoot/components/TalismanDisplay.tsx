import Icon from "../../../../../../../../../../../components/icon/Icon"
import { ReturnedTalisman } from "../../../../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces"

interface Props {
    talisman: ReturnedTalisman
}

export default function TalismanDisplay({ talisman }: Props) {
    const { skill, explanation } = talisman

    return (
        <li>
            {skill}
            <Icon iconName="info" tooltip={explanation} />
        </li>
    )
}