import Icon from '../../../../icon/Icon'

interface Props {
    patreon: number,
    canplayerview: boolean
}

export default function TileIcon({ canplayerview, patreon }: Props) {
    if (canplayerview) {
        return <Icon iconName='eye' />
    } else if (patreon === 3) {
        return <Icon iconName='plus' />
    } else if (patreon === 20) {
        return <Icon iconName='d20' />
    }

    return <></>
}