import '../ObstaclesDisplay.css'
import Icon from '../../../../../../../../../../../../components/icon/Icon';
import HTMLDisplay from '../../../../../../../../../../components/UI/htmlDisplay/htmlDisplay';
import { Complication, Obstacle, Pair } from '../../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces';
import { getDifficultyBySkullValue } from '../../../../../../../../../../utilities/getDifficulty';

interface Props {
    obstacle: Obstacle | null,
    skillSkulls: number
}

export default function ObstacleDisplay({ obstacle, skillSkulls }: Props) {
    if (!obstacle) { return <></> }

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
                        <td><strong>Difficulty</strong></td>
                        <td>
                            {skillSkulls && difficulty !== 'Universal' ? getDifficultyBySkullValue(skillSkulls) + '\n' : ''}
                            {difficulty}
                        </td>
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
                            {complications.map(({ name, body }: Complication, index) => {
                                return (
                                    <tr key={index} className='standard-row'>
                                        <td>{name}</td>
                                        <td>{body}</td>
                                    </tr>
                                )
                            })}
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
                        <tr className='standard-row'>
                            <td colSpan={2}>
                                <strong>Notes</strong>
                                <HTMLDisplay html={notes} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}