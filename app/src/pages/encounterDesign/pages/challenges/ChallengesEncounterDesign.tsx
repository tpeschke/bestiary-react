import TopHeader from '../../components/TopHeader'
import '../../EncounterDesign.css'
import MappedDrawers from '../../utilities/MappedDrawers'
import FinishingUp from './steps/FinishingUp'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import background from '../../../../assets/images/encounterDesign/challenges.jpg'

export default function ChallengesEncounterDesign() {
    document.title = 'Challenge Design - Bonfire Bestiary'

    const steps = [
        {
            label: "Step 1: What is Success?",
            child: <Step1 />
        },
        {
            label: "Step 2: What are the Steps to Get There?",
            child: <Step2 />
        },
        {
            label: "Step 3: Sketch Out Obstacles",
            child: <Step3 />
        },
        {
            label: "Step 4: List out Boons & Complications",
            child: <Step4 />
        },
        {
            label: "Step 5: Fill in Difficulties & Ease",
            child: <Step5 />
        },
        {
            label: "Finishing Up",
            child: <FinishingUp />
        }
    ]

    return (
        <div className='encounter-design-page'>
            <div className='card-background'>
                <TopHeader name='Challenges' />
                <MappedDrawers steps={steps} />
            </div>
        </div>
    )
}