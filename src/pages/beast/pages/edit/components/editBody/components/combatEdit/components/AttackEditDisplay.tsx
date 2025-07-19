import { AttackInfo } from "../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../components/UI/body/Body"

interface Props {
    attacks: AttackInfo[]
}

export default function AttackEditDisplay({ attacks }: Props) {
    return (
        <Body>
            <>
                <h1>Attacks</h1>
                {attacks.map(({ chosenName, weapon }, index: number) => {
                    return (
                        <div key={index}>
                            {index} {chosenName ? chosenName : '_'} {weapon}
                        </div>
                    )
                })}
            </>
        </Body>
    )
}