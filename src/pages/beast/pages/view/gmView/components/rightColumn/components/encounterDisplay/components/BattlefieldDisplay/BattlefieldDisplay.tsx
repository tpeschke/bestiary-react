import '../../EncounterDisplay.css'

import { BattlefieldObject } from '../../interfaces/EncounterInterfaces'

import explanation from './assets/explanation.jpg'

import alley from './assets/alley.jpg'
import dangerWall from './assets/dangerWall.jpg'
import divide from './assets/divide.jpg'
import funnel from './assets/funnel.jpg'
import guardian from './assets/guardian.jpg'
import horseshoe from './assets/horseshoe.jpg'
import kingOfTheHill from './assets/kingOfTheHill.jpg'
import longPath from './assets/longPath.jpg'
import openField from './assets/openField.jpg'
import pillar from './assets/pillar.jpg'
import pincer from './assets/pincer.jpg'
import uphill from './assets/uphill.jpg'
import Icon from '../../../../../../../../../../../components/icon/Icon'
import Dictionary from '../../../../../../../../../../../interfaces/dictionaryInterfaces'

interface Props {
    battlefieldInfo: BattlefieldObject
}

export default function BattlefieldDisplay({ battlefieldInfo }: Props) {
    const { battlefield, pattern } = battlefieldInfo

    const gmgLink = "https://docs.google.com/document/d/12YPhpdKB1L4KJYAlG3Jpz2jlRnaXtPTh-Os-z3ABMRs/edit?usp=drive_link"

    const htmlTooltip = {
        component: getImage(pattern),
        id: 'pattern-tooltip'
    }

    return (
        <div className='pair-shell secondary-div'>
            <h3>Battlefield / Pattern <a href={gmgLink} target="_blank"><Icon iconName='link' tooltip='This links to the GMG where Patterns are discussed (Step 4.3).' /></a></h3>
            <div><p>{battlefield} / {pattern}</p> <Icon iconName='image' htmlTooltip={htmlTooltip} /></div>
        </div>
    )
}

function getImage(pattern: string) {
    const battlefieldPatternDictionary: Dictionary = {
        'Open Field': openField,
        'Divide': divide,
        'Danger Wall': dangerWall,
        'Pillar': pillar,
        'Guardian': guardian,
        'Pincer': pincer,
        'Funnel': funnel,
        'Horseshoe': horseshoe,
        'Long-Path': longPath,
        'Alley': alley,
        'Up-Hill': uphill,
        'King of the Hill': kingOfTheHill
    }

    return (
        <>
            <img src={explanation} />
            <img src={battlefieldPatternDictionary[pattern]} />
        </>
    )
}