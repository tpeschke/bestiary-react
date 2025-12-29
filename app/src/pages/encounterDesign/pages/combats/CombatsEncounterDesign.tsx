import TopHeader from '../../components/TopHeader'
import '../../EncounterDesign.css'
import MappedDrawers from '../../utilities/MappedDrawers'
import Introduction from './steps/Introduction'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'

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
        },
        {
            label: "Step 5: Determine & Place Enemies & Player Characters",
            child: <Step5 />
        },
        {
            label: "Step 6: Smudge",
            child: <Step6 />
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