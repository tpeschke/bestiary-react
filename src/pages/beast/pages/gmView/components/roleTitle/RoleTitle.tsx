import "./RoleTitle.css"

import Icon from "../../../../../../components/icon/Icon";

interface Props {
    title: string,
    points?: number,
    role?: string,
    secondaryRole?: string,
    hasBottomBorder?: boolean
}

export default function RoleTitle({ title, points, role, secondaryRole, hasBottomBorder }: Props) {
    const showRightSide = (points || points === 0) && role

    let shellClass = 'role-shell'
    if (hasBottomBorder) {
        shellClass += ' title-bottom-border'
    }

    return (
        <div className={shellClass}>
            <h2>{title}</h2>
            {showRightSide &&
                <div className="skull-frame">
                    <p>{role} {secondaryRole ? `(${secondaryRole})` : ''}</p>
                    {getSkullNumber(points).map((_, index: number) => <Icon key={index} iconName="skull" iconSize='h2' />)}
                </div>
            }
        </div>
    )
}

function getSkullNumber(points: number): number[] {
    if (points <= 3) {
        return [...Array(1).keys()]
    } else if (points <= 8) {
        return [...Array(2).keys()]
    } else if (points <= 13) {
        return [...Array(3).keys()]
    } else if (points <= 18) {
        return [...Array(4).keys()]
    } else if (points <= 23) {
        return [...Array(5).keys()]
    } else if (points <= 28) {
        return [...Array(6).keys()]
    } else if (points <= 33) {
        return [...Array(7).keys()]
    } else {
        return [...Array(8).keys()]
    }
}