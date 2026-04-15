import { SaveObject } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import RoleTitle from '../../../roleTitle/RoleTitle'
import './Saves.css'
import Body from '../../../../../../../components/UI/body/Body'
import Pair from '../../../../../../../components/UI/pair/Pair'

interface Props {
    saves: [SaveObject, SaveObject, SaveObject] | null
}

export default function Saves({ saves }: Props) {
    if (!saves) {
        return <></>
    }

    return (
        <>
            <RoleTitle title='Saves' />
            <Body>
                <div className="save-shell">
                    {saves.map(({label, rank}) => <Pair key={label} title={label} info={rank} format={{ title: 'none' }} /> )}
                </div>
            </Body>
        </>
    )
}