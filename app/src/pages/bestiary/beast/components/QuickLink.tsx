import Icon from "../../../../components/icon/Icon";

interface Props {
    copyQuickLink: Function,
    hasModifier: boolean
}

export default function QuickLink({ copyQuickLink, hasModifier }: Props) {
    const tooltip = `This gives you a quick link to this Role${hasModifier ? ' with this Modifier.' : '.'}`

    return (
        <button onClick={_ => copyQuickLink()} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
            <Icon iconName="link" tooltip={tooltip} />
        </button>
    )
}