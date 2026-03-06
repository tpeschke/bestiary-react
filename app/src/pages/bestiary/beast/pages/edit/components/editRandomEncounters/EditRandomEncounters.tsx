import { useEffect } from 'react'
import { EditEncounter } from '../../../view/gmView/components/rightColumn/components/encounterDisplay/interfaces/EncounterInterfaces'
import './EditRandomEncounters.css'
import axios from 'axios'
import { editEncounterURL } from '../../../../../../../frontend-config'

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

    const updateSelect = (value: string) => {
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