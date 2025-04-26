import Body from "../../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../../components/UI/htmlDisplay/htmlDisplay"
import RoleTitle from "../../../../../roleTitle/RoleTitle"


interface Props {
    tactics: string
}

export default function TacticsAndStrategy({ tactics }: Props) {


    return (
        <>
            <RoleTitle title='Tactics & Strategies' />
            <Body>
                <HTMLDisplay html={tactics} />
            </Body>
        </>
    )
}