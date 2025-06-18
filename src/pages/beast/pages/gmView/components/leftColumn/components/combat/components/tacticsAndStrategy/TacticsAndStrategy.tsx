import Body from "../../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../../components/UI/htmlDisplay/htmlDisplay"
import RoleTitle from "../../../../../roleTitle/RoleTitle"


interface Props {
    tactics: string
}

export default function TacticsAndStrategy({ tactics }: Props) {
    const showSection = tactics && tactics !== ''

    return (
        <>
            {showSection &&
                <>
                    <RoleTitle title='Tactics & Strategies' />
                    <Body>
                        <HTMLDisplay html={tactics} />
                    </Body>
                </>
            }
        </>
    )
}