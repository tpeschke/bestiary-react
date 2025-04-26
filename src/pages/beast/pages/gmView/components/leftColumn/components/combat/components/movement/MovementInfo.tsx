import './MovementInfo.css'

import { Movement } from '../../../../../../../../interfaces/infoInterfaces.ts/combatInfoInterfaces'
import Pair from '../../../../../../../../components/UI/pair/Pair'

interface Props {
    movements?: Movement[]
}

export default function MovementInfo({ movements }: Props) {
    return (
        <div className='movements-shell'>
            <Pair title="Movement" info="ft / sec" format={{ heading: true, position: 'opposite', info: 'minor', noBorder: true }} />
            {movements && movements?.length > 0 ?
                <>
                    {movements.map(({ type, stroll, walk, jog, run, sprint }: Movement) => {
                        return (
                            <div className='movement-shell'>
                                <p>{type}</p>
                                <p data-tooltip-id="my-tooltip" data-tooltip-content="Crawl / Stroll">C: {stroll}</p>
                                <p data-tooltip-id="my-tooltip" data-tooltip-content="Walk">W: {walk}</p>
                                <p data-tooltip-id="my-tooltip" data-tooltip-content="Jog">J: {jog}</p>
                                <p data-tooltip-id="my-tooltip" data-tooltip-content="Run">R: {run}</p>
                                <p data-tooltip-id="my-tooltip" data-tooltip-content="Sprint">S: {sprint}</p>
                            </div>
                        )
                    })
                    }
                </>
                :
                <div>This Monster Has No Movement</div>
            }
        </div>
    )
}