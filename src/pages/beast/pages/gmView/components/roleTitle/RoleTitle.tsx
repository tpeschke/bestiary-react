import "./RoleTitle.css"

import Icon from "../../../../../../components/icon/Icon";

interface Props {
    title: string,
    points: number
}

export default function RoleTitle({ title, points }: Props) {
    let skulls: boolean[] = []

    switch (points) {
        case 0:
        case 3:
            break;
        case 5:
        case 8:
            skulls.push(true)
            break;
        case 10:
        case 13:
            skulls.push(true)
            break;
        case 15:
        case 18:
            skulls.push(true)
            break;
        case 20:
        case 23:
            skulls.push(true)
            break;
        case 25:
        case 28:
            skulls.push(true)
            break;
        case 30:
        case 33:
            skulls.push(true)
            break;
        case 35:
        case 38:
            skulls.push(true)
            break;
        default:
            break;
    }
    return (
        <div className="role-shell">
            <h2>{title}</h2>
            <div className="skull-frame">
                {skulls.map((_, index: number) => <Icon key={index} iconName="skull" iconSize='h2'/>)}
            </div>
        </div>
    )
}
