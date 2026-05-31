import { useEffect } from 'react'
import './EditRandomEncounters.css'
import axios from 'axios'
import { editEncounterURL } from '../../../../../../../frontend-config'
import { EditEncounter, ReactionTemperamentOptions } from '@bestiary/common/interfaces/encounterInterfaces'

interface Props {
    beastID: number,
    randomEncounterInfo: EditEncounter | null,
    setRandomEncounterInfo: Function
}

export default function EditRandomEncounters({ beastID, randomEncounterInfo, setRandomEncounterInfo }: Props) {

    useEffect(() => {
        if (!randomEncounterInfo) {
            axios.get(editEncounterURL + beastID).then(({ data }) => {
                setRandomEncounterInfo(data)
            })
        }
    })

    const temperaments = ["Friendly", "Neutral", "Hostile", "Unpredictable"]

    const updateSelect = (value: ReactionTemperamentOptions) => {
        if (randomEncounterInfo) {
            const newEncounter: EditEncounter = {
                ...randomEncounterInfo,
                reaction: {
                    ...randomEncounterInfo.reaction,
                    temperament: value
                }
            }

            setRandomEncounterInfo(newEncounter)
        }
    }

    return (
        <div className='edit-random-encounters'>
            {randomEncounterInfo && (
                <select value={randomEncounterInfo.reaction.temperament} onChange={(event: any) => updateSelect(event.target.value)}>
                    {temperaments.map(temperament => <option key={temperament} value={temperament}>{temperament}</option>)}
                </select>
            )}
        </div>
    )
}