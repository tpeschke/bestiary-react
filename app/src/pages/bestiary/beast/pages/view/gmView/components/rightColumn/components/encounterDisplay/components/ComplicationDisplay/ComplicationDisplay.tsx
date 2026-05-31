import './ComplicationDisplay.css'

import BackUpComplicationDisplay from './components/BackUpComplication'
import BaseComplicationDisplay from './components/BaseComplication'
import LostComplicationDisplay from './components/LostComplication'
import RivalComplicationDisplay from './components/RivalComplication'
import WoundedComplicationDisplay from './components/WoundedComplication'
import EnchantedItemComplicationDisplay from './components/EnchantedItemComplication'
import { BackUpComplication, BaseComplication, LostComplication, RivalComplication, WoundedComplication } from '@bestiary/common/interfaces/encounterInterfaces'

interface Props {
    complications?: BaseComplication[]
}

export default function ComplicationDisplay({ complications }: Props) {
    if (!complications || complications.length === 0) { return <></>}

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
    complication: BaseComplication
}

function GetComplicationComponent({ complication }: ComplicationProps) {
    let complicationInnards = <p>Something Went Wrong</p>
    switch (complication.type) {
        case RIVAL:
        case UNLIKELY_ALLIES:
            complicationInnards = <RivalComplicationDisplay info={complication as RivalComplication} />
            break
        case WOUNDED:
            complicationInnards = <WoundedComplicationDisplay info={complication as WoundedComplication} />
            break
        case LOST:
            complicationInnards = <LostComplicationDisplay info={complication as LostComplication} />
            break
        case BACK_UP_COMING:
            complicationInnards = <BackUpComplicationDisplay info={complication as BackUpComplication} />
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