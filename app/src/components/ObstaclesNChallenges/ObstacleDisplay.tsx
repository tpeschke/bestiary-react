import './ObstacleDisplay.css'
import Icon from '../icon/Icon';
import HTMLDisplay from '../../pages/bestiary/beast/components/UI/htmlDisplay/htmlDisplay';
import { getDifficultyBySkullValue } from '../../pages/bestiary/beast/utilities/getDifficulty';
import { Obstacle, Pair, Complication, SkullVariant } from '@bestiary/common/interfaces/obstacles/obstacleCatalog';
import SkullSelection from '../../pages/bestiary/beast/pages/edit/components/editBody/components/SkullSelection';
import { useState } from 'react';
import alertInfo from '../alert/alerts';
import { useSelector } from 'react-redux';
import { getSystemPreference } from '../../redux/slices/userSlice';
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue";
import { BONFIRE, HACKMASTER } from '@bestiary/common/utilities/get/getSystemString';
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex"
import getBaseSkillRank from '@bestiary/common/utilities/scalingAndBonus/bonfire/skill/getSkillRank';
import Variants from './components/Variants';

interface Props {
    obstacle: Obstacle | null,
    lowerText?: string,
    modifiedSkull?: number | null,
    hideCustomizations?: boolean,
    hideVariants?: boolean,
}

export default function ObstacleDisplay({ obstacle, lowerText, modifiedSkull, hideCustomizations = false, hideVariants = false }: Props) {
    if (!obstacle) { return <></> }

    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2
    const isBonfire = systemPreference === BONFIRE

    const [obstacleToShow, setObstacleToShow] = useState(obstacle)

    const { id, name, difficulty, prompt, time, threshold, complicationsingle, complications = [], skullVariants = [], failure, success, information, notes, pairsOne } = obstacleToShow;

    let { skull, ep,  } = obstacleToShow

    skull = modifiedSkull || modifiedSkull === 0 ? modifiedSkull : skull
    ep = modifiedSkull || modifiedSkull === 0 ? getBaseEPValue(modifiedSkull) : ep

    const epValueIndex = getEPIndex(ep)

    const difficultyToShow = difficulty[systemPreference]

    const promptTooltip = isBonfire ?
        "When the players trigger this trap, read out the prompt and give them 1 second to respond\nIf they do something that helps, they gain +2 Position.\nIf they do something that doesn't, -2 Position"
        : "When the players trigger this trap, read out the prompt and give them 1 second to respond\nIf they do something that helps, they gain +15% to their Check.\nIf they do something that doesn't, -15%";

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
        const { origin } = window.location
        if (addSkull) {
            return `${origin}/obstacles/${id}?skull=${skull}`
        }
        return `${origin}/obstacles/${id}`
    }

    function formatSkullsForDisplay(skulls: number) {
        if (skulls === 0) {
            return <Icon iconName="skull-outline" iconSize='h2' />
        }
        return [...Array(skulls).keys()].map((_, index: number, array: number[]) => <Icon key={index} iconName="skull" iconSize='h2' color={array.length >= 7 ? 'red' : 'white'} />)
    }

    function formatDifficulty() {
        if (difficultyToShow !== 'Universal' && isBonfire) {
            return getDifficultyBySkullValue(skull) + '\n'
        } else if (difficultyToShow !== 'Universal' && !isBonfire) {
            return getBaseSkillRank(epValueIndex, 'HackMaster') + '%\n'
        }
        return ''
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
                            <SkullSelection currentSkullValue={isBonfire ? skull : undefined} currentEPValue={!isBonfire ? ep : undefined} updateSkull={updateSkull} skullKeyValue='skull' epKeyValue='ep' />
                        </td>
                    </tr>}
                    {hideCustomizations && <tr className='standard-row'>
                        <td colSpan={2}>
                            {formatSkullsForDisplay(skull)}
                        </td>
                    </tr>}
                    {prompt && <tr className='standard-row'>
                        <td><strong>Prompt <Icon iconName='info' tooltip={promptTooltip} /></strong></td>
                        <td>{prompt}</td>
                    </tr>}
                    <tr className='standard-row'>
                        <td>
                            <strong>Difficulty</strong>
                        </td>
                        <td>
                            {formatDifficulty()}
                            {difficultyToShow}
                        </td>
                    </tr>
                    {time && <tr className='standard-row'>
                        <td><strong>Time</strong></td>
                        <td>{time}</td>
                    </tr>}
                    {/* Pair Two */}
                    {threshold && <tr className='standard-row'>
                        <td><strong>Ease {!isBonfire && <Icon iconName='info' tooltip={"This is number of failed attempts the PCs get against this Obstacle"} />}</strong></td>
                        <td>{threshold}</td>
                    </tr>}
                    {(complicationsingle || complications.length === 1) && <tr className='standard-row'>
                        <td><strong>Complication {!isBonfire && <Icon iconName='info' tooltip={"This is a bad thing that happens on a regular failed Check before the Ease is hit"} />}</strong></td>
                        <td>{complicationsingle ? complicationsingle[systemPreference] : complications[0].body}</td>
                    </tr>}
                    {complications.length > 1 && (
                        <>
                            <tr className='standard-row'>
                                <td colSpan={2}><strong>Complications {!isBonfire && <Icon iconName='info' tooltip={"These are bad things that happens on a regular failed Check before the Ease is hit. Roll or select 1."} />}</strong></td>
                            </tr>
                            {complications.map(({ body }: Complication, index) => {
                                return (
                                    <tr key={index} className='standard-row complication-row'>
                                        <td>{index + 1}</td>
                                        <td>{body[systemPreference]}</td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                    {failure && <tr className='standard-row'>
                        <td><strong>Failure {!isBonfire && <Icon iconName='info' tooltip={"When the number of failed Checks by the PCs is greater than the Ease, this Failure happens."} />}</strong></td>
                        <td>{failure[systemPreference]}</td>
                    </tr>}
                    {success && <tr className='standard-row'>
                        <td><strong>Success</strong></td>
                        <td>{success[systemPreference]}</td>
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

                    <Variants hideVariants={hideVariants} skullVariants={skullVariants} systemPreference={systemPreference} />
                </tbody>
            </table>
            {!hideCustomizations && <button onClick={copyQuickLink}><Icon iconName='link' /></button>}
            {(!hideCustomizations && obstacle.skull !== skull) && <button onClick={event => copyQuickLink(event, true)}><Icon iconName='link' /><Icon iconName='plus' /><Icon iconName='skull' /></button>}
            {lowerText && <p className='italic'>{lowerText}</p>}
        </div>
    )
}