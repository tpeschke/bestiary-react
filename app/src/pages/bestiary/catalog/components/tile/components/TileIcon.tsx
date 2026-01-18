import Icon from "../../../../../../components/icon/Icon"

interface Props {
    patreon: number,
    canplayerview: boolean
}

export default function TileIcon({ canplayerview, patreon }: Props) {
    if (canplayerview) {
        return <Icon tooltip="Anyone can view this entry" iconName='eye' />
    } else if (patreon === 3) {
        return <Icon tooltip="This entry uses the Deluxe rules" iconName='plus' />
    } else if (patreon === 20) {
        return <Icon tooltip="Early Access" iconName='d20' />
    }

    return <></>
}