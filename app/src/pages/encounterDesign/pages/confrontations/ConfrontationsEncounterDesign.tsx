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
    const isBonfire = systemPreference === BONFIRE

    const encounterTerm = isBonfire ? 'Confrontation' : 'Social Encounter'

    document.title = `${encounterTerm} Design - Bonfire Bestiary`

    return (
        <div className='encounter-design-page'>
            {isBonfire ? (
                <>
                    {getBonfireVersion()}
                </>
            ) : (
                <>
                    {getHackMasterVersion()}
                </>
            )}
        </div >
    )
}

function getBonfireVersion() {
    return (
        <div className='card-background'>
            <TopHeader name={`Confrontations`} />
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

function getHackMasterVersion() {
    return (
        <div className='card-background'>
            <TopHeader name={`Social`} />
            <p>This framework is meant to give you, the GM, a scaffolding to give social interactions more of a bite (and more of an influence on the rest of the game).</p>
            <p>A basic set up is given if you want to have it play only a minor role (and have it resolve quicker) and an advanced set up is given if you want something a bit more hefty. The advanced set up is built on the basic set up so you can shift between them when ready.</p>
        </div>
    )
}