import { UpdateFunction } from "../../../../../../hooks/updateUtilities/interfaces/updateInterfaces"

interface Props {
    updateFunction: UpdateFunction,
    primaryRole: string,
    secondaryRole: string,
    primaryKey: string,
    secondaryKey: string,
    primaryDictionary: string[],
}

export default function RoleSelects({ updateFunction, primaryRole, secondaryRole, primaryKey, secondaryKey, primaryDictionary }: Props) {
    const secondaryDictionary: string[] = [
        '',
        'Lesser',
        'Veteran',
        'Champion',
        'Officer',
        'Tyrant',
        'Solo'
    ]

    return (
        <div className="select-role-shell">
            <select onChange={event => updateFunction(secondaryKey, event.target.value)} value={secondaryRole}>
                {secondaryDictionary.map((secondary, index) => <option key={index} value={secondary}>{secondary}</option>)}
            </select>
            <select onChange={event => updateFunction(primaryKey, event.target.value)} value={primaryRole}>
                {primaryDictionary.map((primary, index) => <option key={index} value={primary}>{primary}</option>)}
            </select>
        </div>
    )
}