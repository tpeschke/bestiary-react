import { Access, EARLY_ACCESS, getEntryAccessLevel, GM } from "@bestiary/common/utilities/get/getAccessLevel"
import Icon from "../../../../../../components/icon/Icon"

interface Props {
    patreon: number,
    canplayerview: boolean
}

export default function TileIcon({ canplayerview, patreon }: Props) {
    const accessString = getEntryAccessLevel(patreon)

    if (canplayerview) {
        return <Icon tooltip="Anyone can view this entry" iconName='eye' />
    } 
    // else if (accessString === GM) {
    //     return <Icon tooltip="This entry uses the Deluxe rules" iconName='plus' />
    // } 
    else if (accessString === EARLY_ACCESS) {
        return <Icon tooltip="Early Access" iconName='d20' />
    }

    return <></>
}