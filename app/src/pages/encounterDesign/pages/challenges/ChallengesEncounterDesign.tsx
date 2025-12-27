import Drawer from '../../../../components/drawers/components/Drawer'
import Drawers from '../../../../components/drawers/Drawers'
import TopHeader from '../../components/TopHeader'
import '../../EncounterDesign.css'
import ChallengeTypes from './steps/ChallengeTypes'
import TypeI from './steps/TypeI/TypeI'
import TypeII from './steps/TypeII/TypeII'

export default function ChallengesEncounterDesign(){
    return (
        <div className='card-background encounter-design-page'>
            <TopHeader name='Challenges' />
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
    )
}