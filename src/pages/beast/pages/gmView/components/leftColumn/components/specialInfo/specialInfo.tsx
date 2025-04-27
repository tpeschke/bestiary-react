import HTMLDisplay from "../../../../../../components/UI/htmlDisplay/htmlDisplay"
import Body from '../../../../../../components/UI/body/Body'

interface Props {
    info?: string,
}

export default function SpecialInfo({ info }: Props) {
    return (
        <>
            {info ?
                <Body>
                    <HTMLDisplay html={info} />
                </Body>
                :
                <></>
            }
        </>
    )
}