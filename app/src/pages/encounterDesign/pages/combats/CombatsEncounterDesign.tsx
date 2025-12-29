import TopHeader from '../../components/TopHeader'
import '../../EncounterDesign.css'
import MappedDrawers from '../../utilities/MappedDrawers'
import Introduction from './steps/Introduction'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'

export default function CombatsEncounterDesign() {
    document.title = 'Combat Design - Bonfire Bestiary'

    const steps = [
        {
            label: "Introduction",
            child: <Introduction />
        },
        {
            label: "Step 1: Select Enemy Type(s)",
            child: <Step1 />
        },
        {
            label: "Step 2: Figure Out Objective(s)",
            child: <Step2 />
        },
        {
            label: "Step 3: Select Role Types",
            child: <Step3 />
        },
        {
            label: "Step 4: Layout Battlefield",
            child: <Step4 />
        }
    ]

    return (
        <div className='encounter-design-page'>
            <div className='card-background'>
                <TopHeader name='Combats' />
                <MappedDrawers steps={steps} />
            </div>
        </div>
    )
}