import MappedDrawers from "../../../../../utilities/MappedDrawers"
import Step1 from "./steps/Step1"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"

export default function Basic() {
    const steps = [
        {
            label: "Step 1: Determine Emotion",
            child: <Step1 />
        },
        {
            label: "Step 2: Determine Difficulty",
            child: <Step2 />
        },
        {
            label: "Step 3: Slinging Dice",
            child: <Step3 />
        },
        {
            label: "Step 4: Cashing in the Emotion",
            child: <Step4 />
        }
    ]

    return <MappedDrawers steps={steps} />
}

