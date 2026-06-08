import MappedDrawers from "../../../../../utilities/MappedDrawers"
import Step1 from "./steps/Step1"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"
import Step5 from "./steps/Step5"
import Step6 from "./steps/Step6"

export default function Advanced() {
    const steps = [
        {
            label: "Step 1: Desired Action",
            child: <Step1 />
        },
        {
            label: "Step 2: Determine Emotion",
            child: <Step2 />
        },
        {
            label: "Step 3: Willingness & Ability",
            child: <Step3 />
        },
        {
            label: "Step 4: Set Difficulty",
            child: <Step4 />
        },
        {
            label: "Step 5: Slinging Dice",
            child: <Step5 />
        },
        {
            label: "Step 6: The Action",
            child: <Step6 />
        }
    ]

    return <MappedDrawers steps={steps} />
}

