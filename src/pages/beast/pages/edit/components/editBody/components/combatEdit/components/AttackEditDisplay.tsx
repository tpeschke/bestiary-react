import { AttackInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"

interface Props {
    attacks: AttackInfo[]
}

export default function AttackEditDisplay({ attacks }: Props) {
    console.log(attacks)
    return (
        <Body>
            <>
                <h1>Attacks</h1>
                {attacks.map(({ name, weapon }, index: number) => {
                    return (
                        <div key={index}>
                            {index} {name ? name : '_'} {weapon ? weapon : '_'}
                        </div>
                    )
                })}
            </>
        </Body>
    )
}