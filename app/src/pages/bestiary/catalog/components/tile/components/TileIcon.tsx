import { Access, EARLY_ACCESS, GM } from "@bestiary/common/utilities/get/getAccessLevel"
import Icon from "../../../../../../components/icon/Icon"

interface Props {
    patreon: Access,
    canplayerview: boolean
}

export default function TileIcon({ canplayerview, patreon }: Props) {
    if (canplayerview) {
        return <Icon tooltip="Anyone can view this entry" iconName='eye' />
    } else if (patreon === GM) {
        return <Icon tooltip="This entry uses the Deluxe rules" iconName='plus' />
    } else if (patreon === EARLY_ACCESS) {
        return <Icon tooltip="Early Access" iconName='d20' />
    }

    return <></>
}