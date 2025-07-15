import { LocationVitality } from "../../../../../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../../components/UI/pair/Pair"

interface Props {
    locationalVitalities: LocationVitality[]
}

export default function LocationVitalities({ locationalVitalities }: Props) {
    return (
        <>
            {locationalVitalities.length > 0 &&
                <>
                    <h6>Locational Vitalities</h6>
                    <Body>
                        <>
                            {locationalVitalities.map(({ location, vitality }: LocationVitality, index) => {
                                return (
                                    <Pair key={index} title={location} info={vitality} format={{ title: 'none' }} />
                                )
                            })}
                        </>
                    </Body >
                </>
            }
        </>
    )
}