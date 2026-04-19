import '../../EncounterDesign.css'
import Drawer from '../../../../components/drawers/components/Drawer'
import Drawers from '../../../../components/drawers/Drawers'
import TopHeader from '../../components/TopHeader'
import ChallengeTypes from './steps/ChallengeTypes'
import TypeI from './steps/TypeI/TypeI'
import TypeII from './steps/TypeII/TypeII'
import { useSelector } from 'react-redux'
import { getSystemPreference } from '../../../../redux/slices/userSlice'
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'

export default function ConfrontationsEncounterDesign() {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    const encounterTerm = systemPreference === BONFIRE ? 'Confrontation' : 'Social Encounter'

    document.title = `${encounterTerm} Design - Bonfire Bestiary`

    return (
        <div className='encounter-design-page'>
            <div className='card-background'>
                <TopHeader name={`${encounterTerm}s`} />
                <Drawers>
                    <Drawer label='Type I vs Type II'>
                        <ChallengeTypes encounterTerm={encounterTerm} />
                    </Drawer>
                    <Drawer label='Creating Type I: Automatic'>
                        <TypeI encounterTerm={encounterTerm} />
                    </Drawer>
                    <Drawer label='Creating Type II: Traditional'>
                        <TypeII encounterTerm={encounterTerm} />
                    </Drawer>
                </Drawers>
            </div>
        </div>
    )
}