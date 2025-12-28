import Body from "../../../../../../../../../components/UI/body/Body"
import HTMLDisplay from "../../../../../../../../../components/UI/htmlDisplay/htmlDisplay"

interface Props {
    tactics: string
}

export default function TacticsAndStrategy({ tactics }: Props) {
    const showSection = tactics && tactics !== ''

    return (
        <>
            {showSection &&
                <>
                    <br />
                    <h2 className="border">Tactics & Strategies</h2>
                    <Body>
                        <HTMLDisplay html={tactics} />
                    </Body>
                </>
            }
        </>
    )
}