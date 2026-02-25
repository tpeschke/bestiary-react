import GeneralInfo from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import './GeneralInfoEdit.css'
import { UpdateGeneralInfoFunctionsObject } from '../../../../../../hooks/updateUtilities/updateGeneralInfo'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ComboBox from 'react-responsive-combo-box'
import { searchURL } from '../../../../../../../../../frontend-config'
import axios from 'axios'

interface Props {
    generalInfo: GeneralInfo,
    updateGeneralInfoFunctions: UpdateGeneralInfoFunctionsObject
}

export default function GeneralInfoEdit({ generalInfo, updateGeneralInfoFunctions }: Props) {
    const { palette } = generalInfo
    const { updatePaletteInfo } = updateGeneralInfoFunctions
    const { drives, needs, defenses, logistics, methods, groupDescriptions, commonAllies } = palette

    const updateCommonAllies = (option: string) => {
        const newAlly = entryOptions.find((fullOption) => fullOption.name === option)
        if (newAlly) {
            const { id, name } = newAlly
            const newCommonAllies = [...commonAllies, {
                id: 0,
                beastid: 0,
                allyid: id,
                name,
                plural: null
            }]
            updatePaletteInfo('commonAllies', newCommonAllies)
        }
    }

    const [timeOutID, setTimeOutId] = useState<any | null>(null)

    const updateCommonAlliesOptions = async (name: string) => {
        clearTimeout(timeOutID)

        if (name !== '') {
            setTimeOutId(setTimeout(async () => {
                const { data }: any = await axios.get(searchURL + `?name=${name}`)
                setEntryOptions(data)
            }, 500))
        } else {
            setEntryOptions([])
        }
    }

    const [entryOptions, setEntryOptions] = useState<{ id: number, name: string }[]>([])

    const formatName = (name: string, plural: string | null) => {
        if (plural) {
            return plural
        } else if (name.includes(',')) {
            const [front, back] = name.split(',')
            return `${back} ${front}s`
        }
        return name + 's'
    }

    return (
        <div className="main-info-edit">
            <h2 className="border">Palette</h2>
            <h3>Drive(s)</h3>
            <input placeholder='Drive(s)' value={drives ? drives : ''} onChange={event => updatePaletteInfo('drives', event.target.value)} />
            <h3>Need(s)</h3>
            <input placeholder='Need(s)' value={needs ? needs : ''} onChange={event => updatePaletteInfo('needs', event.target.value)} />
            <h3>Defenses</h3>
            <input placeholder='Defenses' value={defenses ? defenses : ''} onChange={event => updatePaletteInfo('defenses', event.target.value)} />
            <h3>Logistics</h3>
            <input placeholder='Logistics' value={logistics ? logistics : ''} onChange={event => updatePaletteInfo('logistics', event.target.value)} />
            <h3>Methods</h3>
            <input placeholder='Methods' value={methods ? methods : ''} onChange={event => updatePaletteInfo('methods', event.target.value)} />
            <h3>Group Descriptions</h3>
            <input placeholder='Group Descriptions' value={groupDescriptions ? groupDescriptions : ''} onChange={event => updatePaletteInfo('groupDescriptions', event.target.value)} />
            <h3>Common Allies</h3>
            <div className='common-allies-shell'>
                {commonAllies.map(({ allyid, name, plural }) => {
                    return <Link key={allyid} to={`/beast/${allyid}`} target='_blank'>{formatName(name, plural)}</Link>
                })}
            </div>
            <ComboBox
                onSelect={option => updateCommonAllies(option)}
                onChange={(event: any) => updateCommonAlliesOptions(event.target.value)}
                placeholder="Entry Name"
                options={entryOptions.map(option => option.name)}
                enableAutocomplete
            />
        </div>
    )
}