import './ComplicationDisplay.css'

import { Complication } from '../../interfaces/EncounterInterfaces'
import BackUpComplicationDisplay from './components/BackUpComplication'
import BaseComplicationDisplay from './components/BaseComplication'
import LostComplicationDisplay from './components/LostComplication'
import RivalComplicationDisplay from './components/RivalComplication'
import WoundedComplicationDisplay from './components/WoundedComplication'
import EnchantedItemComplicationDisplay from './components/EnchantedItemComplication'

interface Props {
    complications: Complication[]
}

export default function ComplicationDisplay({ complications }: Props) {
    console.log(complications)
    return (
        <div className='complications-shell'>
            <h3>Complication{complications.length > 1 ? 's' : ''}</h3>
            <div>
                {complications.map((complication, index) => <GetComplicationComponent key={index} complication={complication} />)}
            </div>
        </div>
    )
}

interface ComplicationProps {
    complication: Complication
}

function GetComplicationComponent({ complication }: ComplicationProps) {
    let complicationInnards = <p>Something Went Wrong</p>
    switch (complication.type) {
        case RIVAL:
        case UNLIKELY_ALLIES:
            complicationInnards = <RivalComplicationDisplay info={complication} />
            break
        case WOUNDED:
            complicationInnards = <WoundedComplicationDisplay info={complication} />
            break
        case LOST:
            complicationInnards = <LostComplicationDisplay info={complication} />
            break
        case BACK_UP_COMING:
            complicationInnards = <BackUpComplicationDisplay info={complication} />
            break
        case ENCHANTED_ITEM:
            complicationInnards = <EnchantedItemComplicationDisplay info={complication} />
            break
        case TRAPPED:
        case INSANE:
        case DISEASED:
        case TIME_LIMIT:
        case POWERFUL_CASTER:
        case INFIGHTING:
        case LARGE:
            complicationInnards = <BaseComplicationDisplay info={complication} />
            break
    }
    return (
        <div className='complication-shell'>
            {complicationInnards}
        </div>
    )
}

const RIVAL = 'Rival'
const WOUNDED = 'Wounded'
const TRAPPED = 'Trapped'
const INSANE = 'Insane'
const LOST = 'Lost'
const DISEASED = 'Diseased'
const TIME_LIMIT = 'Time Limit'
const BACK_UP_COMING = 'Back Up Coming'
const POWERFUL_CASTER = 'Powerful Weird-Adept or Servant'
const INFIGHTING = 'Infighting'
const LARGE = 'Large (50% more Vitality)'
const UNLIKELY_ALLIES = 'Unlikely Allies'
const ENCHANTED_ITEM = 'Enchanted Item'