import './ObstacleDisplay.css'
import Icon from '../icon/Icon';
import HTMLDisplay from '../../pages/bestiary/beast/components/UI/htmlDisplay/htmlDisplay';
import { getDifficultyBySkullValue } from '../../pages/bestiary/beast/utilities/getDifficulty';
import { Obstacle, Pair, Complication, SkullVariant } from '@bestiary/common/interfaces/obstacles/obstacleCatalog';
import SkullSelection from '../../pages/bestiary/beast/pages/edit/components/editBody/components/SkullSelection';
import { useState } from 'react';
import alertInfo from '../alert/alerts';

interface Props {
    obstacle: Obstacle | null,
    lowerText?: string,
    modifiedSkull?: number | null,
    hideCustomizations?: boolean,
    hideVariants?: boolean,
    hideLinks?: boolean
}

export default function ObstacleDisplay({ obstacle, lowerText, modifiedSkull, hideCustomizations = false, hideVariants = false, hideLinks = false }: Props) {
    if (!obstacle) { return <></> }

    const [obstacleToShow, setObstacleToShow] = useState(obstacle)

    const { name, difficulty, time, threshold, complicationsingle, complications = [], skullVariants = [], failure, success, information, notes, pairsOne } = obstacleToShow;

    let { skull } = obstacleToShow
    skull = modifiedSkull || modifiedSkull === 0 ? modifiedSkull : skull

    const updateSkull = (key: string, value: any) => {
        const newObstacleToShow = {
            ...obstacleToShow,
            [key]: value
        }
        setObstacleToShow(newObstacleToShow)
    }

    const copyQuickLink = (event: any, addSkull: boolean = false) => {
        event.stopPropagation()

        let textArea = getTextArea()
        const url = getURL(addSkull)

        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            alertInfo({ color: "green", message: `"${name}" ${addSkull ? `@ ${skull} Skulls` : ""} shortcut successfully copied`, type: 'message' })
        } catch (err) {
            alertInfo({ color: "red", message: `Unable to copy "${name}" shortcut`, type: 'message' })
        }
        document.body.removeChild(textArea);
    }

    const getTextArea = () => {
        let textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';

        return textArea
    }

    const getURL = (addSkull: boolean = false) => {
        const { origin, pathname } = window.location
        if (addSkull) {
            return `${origin}${pathname}?skull=${skull}`
        }
        return `${origin}${pathname}`
    }

    function formatSkullsForDisplay(skulls: number) {
        if (skulls === 0) {
            return <Icon iconName="skull-outline" iconSize='h2' />
        }
        return [...Array(skulls).keys()].map((_, index: number, array: number[]) => <Icon key={index} iconName="skull" iconSize='h2' color={array.length >= 7 ? 'red' : 'white'} />)
    }

    return (
        <div className="obstacle-shell" onClick={event => event.stopPropagation()}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}><Icon iconName="obstacle" color='white' /> {name}</th>
                    </tr>
                </thead>
                <tbody>
                    {!hideCustomizations && <tr className='standard-row'>
                        <td colSpan={2}>
                            <SkullSelection currentSkullValue={skull} updateSkull={updateSkull} keyValue='skull' />
                        </td>
                    </tr>}
                    {hideCustomizations && <tr className='standard-row'>
                        <td colSpan={2}>
                            {formatSkullsForDisplay(skull)}
                        </td>
                    </tr>}
                    <tr className='standard-row'>
                        <td>
                            <strong>Difficulty</strong>
                        </td>
                        <td>
                            {difficulty !== 'Universal' ? getDifficultyBySkullValue(skull) + '\n' : ''}
                            {difficulty}
                        </td>
                    </tr>
                    {time && <tr className='standard-row'>
                        <td><strong>Time</strong></td>
                        <td>{time}</td>
                    </tr>}
                    {/* Pair Two */}
                    {threshold && <tr className='standard-row'>
                        <td><strong>Ease</strong></td>
                        <td>{threshold}</td>
                    </tr>}
                    {(complicationsingle || complications.length === 1) && <tr className='standard-row'>
                        <td><strong>Complication</strong></td>
                        <td>{complicationsingle ? complicationsingle : complications[0].body}</td>
                    </tr>}
                    {complications.length > 1 && (
                        <>
                            <tr className='standard-row'>
                                <td colSpan={2}><strong>Complications</strong></td>
                            </tr>
                            {complications.map(({ name, body }: Complication, index) => {
                                return (
                                    <tr key={index} className='standard-row complication-row'>
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
                        pairsOne.map(({ name, body }: Pair, index) => {
                            return (
                                <tr key={index} className='standard-row'>
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

                    {(!hideVariants && skullVariants.length > 0) && (
                        <>
                            <tr className='standard-row'>
                                <td colSpan={2}><strong>Variants</strong></td>
                            </tr>
                            {skullVariants.map(({ skullValue, body }: SkullVariant, index) => {
                                return (
                                    <tr key={index} className='standard-row complication-row'>
                                        <td>{skullValue} <Icon iconName='skull' /></td>
                                        <td>{body}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={2} className='italic'>These are suggestions; variations within variations exist that might further modify the Skull value of an Obstacle.</td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
            {!hideCustomizations && <button onClick={copyQuickLink}><Icon iconName='link' /></button>}
            {(!hideLinks && obstacle.skull !== skull) && <button onClick={event => copyQuickLink(event, true)}><Icon iconName='link' /><Icon iconName='plus' /><Icon iconName='skull' /></button>}
            {lowerText && <p className='italic'>{lowerText}</p>}
        </div>
    )
}