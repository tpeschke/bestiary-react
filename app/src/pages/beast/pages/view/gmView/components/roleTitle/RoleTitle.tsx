import "./RoleTitle.css"

import Icon from "../../../../../../../components/icon/Icon";

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

    const tooltip = "This indicates how dangerous this entry is.\nRed Skulls represent a particularly dangerous entry"

    const applicableStatModifierByTitle: {[key: string]: string} = {
        Combat: 'Vitality',
        Skills: 'Nerve',
        Confrontation: 'Relationships'
    }

    const secondaryRoleTooltipDictionary: {[key: string]: string} = {
        Lesser: `This Secondary Role means that this entry has normal stats for its Skull Rating except that is has half the ${applicableStatModifierByTitle[title]}.`,
        Veteran: `This Secondary Role means that this entry is built to require 2 or more characters to fight it at one time.`,
        Champion: `This Secondary Role means that this entry is meant to be taken on by only 1 enemy at a time.`,
        Officer: `This Secondary Role means that this entry gives bonuses to its allies, making all of them more powerful.`,
        Tyrant: `This Secondary Role means that this entry gains bonuses from its allies, making it more powerful`,
        Solo: `This Secondary Role means that this entry is built to take on 4 characters.`
    }

    const secondaryTooltip = secondaryRole ? secondaryRoleTooltipDictionary[secondaryRole] : null

    return (
        <div className={shellClass}>
            <h2>{title}</h2>
            {showRightSide &&
                <div className="skull-frame">
                    <p><span data-tooltip-id="my-tooltip" data-tooltip-content={secondaryTooltip}>{secondaryRole ? `${secondaryRole} ` : ''} </span>{role} </p>
                    <span data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
                        {getSkullNumber(points).map((_, index: number, array: number[]) => <Icon key={index} iconName="skull" iconSize='h2' color={array.length >= 7 ? 'red' : 'white'} tooltip={tooltip} />)}
                    </span>
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