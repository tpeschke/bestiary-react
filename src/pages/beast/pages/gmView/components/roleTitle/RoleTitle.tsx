import "./RoleTitle.css"

import Icon from "../../../../../../components/icon/Icon";

interface Props {
    title: string,
    points: number,
    role: string,
    secondaryRole?: string
}

export default function RoleTitle({ title, points, role, secondaryRole }: Props) {
    return (
        <div className="role-shell">
            <h2>{title}</h2>
            <div className="skull-frame">
                <p>{role} {secondaryRole ? `(${secondaryRole})` : ''}</p>
                {getSkullNumber(points).map((_, index: number) => <Icon key={index} iconName="skull" iconSize='h2' />)}
            </div>
        </div>
    )
}

function getSkullNumber(points: number): number[] {
    switch (points) {
        case 0:
        case 3:
            return [...Array(1).keys()]
        case 5:
        case 8:
            return [...Array(2).keys()]
        case 10:
        case 13:
            return [...Array(3).keys()]
        case 15:
        case 18:
            return [...Array(4).keys()]
        case 20:
        case 23:
            return [...Array(5).keys()]
        case 25:
        case 28:
            return [...Array(6).keys()]
        case 30:
        case 33:
            return [...Array(7).keys()]
        case 35:
        case 38:
            return [...Array(8).keys()]
        default:
            return [];
    }
}