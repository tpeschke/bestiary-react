import Icon from "../../../../../../../../../../../components/icon/Icon"

interface Props {
    script: string
}

export default function AlmScriptDisplay({script}: Props) {
    return (
        <li>
            {script}
            <Icon iconName="info" tooltip="Destroying this script awards the noted Favor that must immediately be spent. It can take you above your Max Favor." />
        </li>
    )
}