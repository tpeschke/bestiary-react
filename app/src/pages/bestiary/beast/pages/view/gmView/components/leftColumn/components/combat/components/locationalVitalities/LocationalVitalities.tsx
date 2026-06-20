import { LocationVitality } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import Body from "../../../../../../../../../components/UI/body/Body"
import Pair from "../../../../../../../../../components/UI/pair/Pair"
import { SystemOption } from "@bestiary/common/interfaces/beast/beast"

interface Props {
    locationalVitalities: LocationVitality[],
    system: SystemOption
}

export default function LocationVitalities({ locationalVitalities, system }: Props) {
    return (
        <>
            {locationalVitalities.length > 0 &&
                <Body>
                    <>
                        <h6>Locational Vitalities</h6>
                        <Body>
                            <>
                                {locationalVitalities.map(({ location, hmVitality, bonfireVitality }: LocationVitality, index) => {
                                    return (
                                        <Pair key={index} title={location} info={system === 'HackMaster' ? hmVitality : bonfireVitality} format={{ title: 'none' }} />
                                    )
                                })}
                            </>
                        </Body >
                    </>
                </Body>
            }
        </>
    )
}