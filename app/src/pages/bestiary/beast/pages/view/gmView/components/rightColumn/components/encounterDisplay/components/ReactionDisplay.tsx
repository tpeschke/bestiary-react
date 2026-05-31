import { Reaction } from '@bestiary/common/interfaces/encounterInterfaces'
import Icon from '../../../../../../../../../../../components/icon/Icon'
import '../EncounterDisplay.css'

interface Props {
    reactionInfo?: Reaction
}

export default function ReactionDisplay({ reactionInfo }: Props) {
    if (!reactionInfo) { return <></> }

    const { temperament, result } = reactionInfo

    return (
        <div className='pair-shell'>
            <h3>Reaction</h3>
            <p>{result} <Icon iconName='info' tooltip={temperament} /></p>
        </div>
    )
}