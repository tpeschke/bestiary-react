import '../ObstaclesDisplay.css'

import Icon from "../../../../../../../../../../../components/icon/Icon";
import { Complication, Obstacle, Pair } from "../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"
import HTMLDisplay from '../../../../../../../../../components/UI/htmlDisplay/htmlDisplay';

interface Props {
    obstacle: Obstacle
}

export default function ObstacleDisplay({ obstacle }: Props) {
    const { name, difficulty, time, threshold, complicationsingle, complications = [], failure, success, information, notes, pairsOne } = obstacle;

    return (
        <div className="obstacle-shell">
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}><Icon iconName="obstacle" color='white' /> {name}</th>
                    </tr>
                </thead>
                <tbody>
                    {difficulty && <tr className='standard-row'>
                        <td><strong>Risk</strong></td>
                        <td>{difficulty}</td>
                    </tr>}
                    {time && <tr className='standard-row'>
                        <td><strong>Time</strong></td>
                        <td>{time}</td>
                    </tr>}
                    {/* Pair Two */}
                    {threshold && <tr className='standard-row'>
                        <td><strong>Ease</strong></td>
                        <td>{threshold}</td>
                    </tr>}
                    {complicationsingle && <tr className='standard-row'>
                        <td><strong>Complication</strong></td>
                        <td>{complicationsingle}</td>
                    </tr>}
                    {complications.length > 0 && (
                        <>
                            <tr className='standard-row'>
                                <td colSpan={2}><strong>Complications</strong></td>
                            </tr>
                            <tr className='standard-row'>
                                <td colSpan={2}>
                                    {complications.map(({name, body}: Complication) => {
                                        return (
                                            <tr className='standard-row'>
                                                <td>{name}</td>
                                                <td>{body}</td>
                                            </tr>
                                        )
                                    })}
                                </td>
                            </tr>
                        </>
                    )}
                    {failure && <tr className='standard-row'>
                        <td><strong>Failure</strong></td>
                        <td>{failure}</td>
                    </tr>}
                    {success && <tr className='standard-row'>
                        <td><strong>Success</strong></td>
                        <td>{success}</td>
                    </tr>}
                    {pairsOne && (
                        pairsOne.map(({ name, body }: Pair) => {
                            return (
                                <tr className='standard-row'>
                                    <td><strong>{name}</strong></td>
                                    <td>{body}</td>
                                </tr>
                            )
                        })
                    )}
                    {information && <HTMLDisplay html={information} />}
                    {notes && (
                        <>
                            <tr className='standard-row'>
                                <td colSpan={2}><strong>Notes</strong></td>
                            </tr>
                            <HTMLDisplay html={notes} />
                        </>
                    )}
                </tbody>
            </table>
        </div>
    )
}