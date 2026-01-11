export default function getSituationOptions(role: string | null): GroupType[] {
    if (!role) {
        return [
            ...situationDictionary
        ]
    }

    const indexOfPreferredSituations = situationRoleIndexDictionary[role]
    let situationDictionaryCopy = [...situationDictionary]

    const [preferredSituations] = situationDictionaryCopy.splice(indexOfPreferredSituations, 1)

    return [
        {
            label: 'Preferred',
            options: [
                ...preferredSituations.options,
            ]
        },
        ...situationDictionaryCopy
    ]
}

const situationRoleIndexDictionary: { [key: string]: number } = {
    'Artillery': 1,
    'Brute': 2,
    'Defender': 3,
    'Duelist': 4,
    'Shock': 5,
    'Skirmisher': 6
}

type GroupType = {
    label: any,
    options: { value: string, label: string }[],
}

const situationDictionary: GroupType[] = [
    {
        label: 'General Options',
        options: [
            { value: 'Engaged', label: 'Engaged' },
            { value: 'Engaged with Ally', label: 'Engaged with Ally' },
            { value: 'Engaged with Light Armor', label: 'Engaged with Light Armor' },
            { value: 'Engaged with Medium / Heavy Armor', label: 'Engaged with Medium / Heavy Armor' },
            { value: 'Engaged with Multiple Enemies', label: 'Engaged with Multiple Enemies' },
            { value: 'Engaged with Shield User', label: 'Engaged with Shield User' },
            { value: 'Engaged with No Weapon', label: 'Engaged with No Weapon' },
            { value: 'Ally Already Engaged', label: 'Ally Already Engaged' },
            { value: 'Adjacent to Ally', label: 'Adjacent to Ally' },
            { value: 'At Distance', label: 'At Distance' },
            { value: 'When Closing', label: 'When Closing' },
            { value: 'On Higher Elevation', label: 'On Higher Elevation' },
            { value: 'Closing In on Enemy', label: 'Closing In on Enemy' },
            { value: 'Flanked', label: 'Flanked' },
            { value: 'Flanking', label: 'Flanking' },
            { value: 'Flanking at Distance', label: 'Flanking at Distance' },
            { value: 'Otherwise', label: 'Otherwise' },
            { value: 'Screening for Ally', label: 'Screening for Ally' },
            { value: 'On First Attack', label: 'On First Attack' },
            { value: 'On Even Attacks', label: 'On Even Attacks' },
            { value: 'On Odd Attacks', label: 'On Odd Attacks' },
            { value: 'After Ranged Attack', label: 'After Ranged Attack' },
            { value: 'After Melee Attack', label: 'After Melee Attack' },
            { value: 'Against Defenseless', label: 'Against Defenseless' },
            { value: 'Against Prone', label: 'Against Prone' },
            { value: 'From Hiding Spot', label: 'From Hiding Spot' },
            { value: 'From Above', label: 'From Above' },
            { value: 'From Water', label: 'From Water' },
            { value: 'While Moving', label: 'While Moving' },
            { value: 'While Mounted', label: 'While Mounted' },
            { value: 'On Ceiling', label: 'On Ceiling' },
            { value: 'Otherwise', label: 'Otherwise' }
        ]
    },
    {
        label: 'Artillery',
        options: [
            { value: 'At Distance', label: 'At Distance' }
        ]
    },
    {
        label: 'Brute',
        options: [
            { value: 'Engaged', label: 'Engaged' }
        ],
    },
    {
        label: 'Defender',
        options: [
            { value: 'Screening for Ally', label: 'Screening for Ally' },
            { value: 'Engaged with Ally', label: 'Engaged with Ally' },
            { value: 'Engaged', label: 'Engaged' }]
    },
    {
        label: 'Duelist',
        options: [
            { value: 'Flanking', label: 'Flanking' }
        ]
    },
    {
        label: 'Shock',
        options: [
            { value: 'Engaged with Ally', label: 'Engaged with Ally' },
            { value: 'Flanking', label: 'Flanking' }
        ]
    },
    {
        label: 'Skirmisher',
        options: [
            { value: 'Flanking at Distance', label: 'Flanking at Distance' },
            { value: 'At Distance', label: 'At Distance' }
        ]
    }
]
