import '../../EncounterDesign.css'
import Drawer from '../../../../components/drawers/components/Drawer'
import Drawers from '../../../../components/drawers/Drawers'
import TopHeader from '../../components/TopHeader'
import ChallengeTypes from './steps/ChallengeTypes'
import TypeI from './steps/TypeI/TypeI'
import TypeII from './steps/TypeII/TypeII'

export default function ConfrontationsEncounterDesign() {
    document.title = 'Confrontation Design - Bonfire Bestiary'

    return (
        <div className='encounter-design-page'>
            <div className='card-background'>
                <TopHeader name='Confrontations' />
                <Drawers>
                    <Drawer label='Type I vs Type II'>
                        <ChallengeTypes />
                    </Drawer>
                    <Drawer label='Creating Type I: Automatic'>
                        <TypeI />
                    </Drawer>
                    <Drawer label='Creating Type II: Traditional'>
                        <TypeII />
                    </Drawer>
                </Drawers>
            </div>
        </div>
    )
}