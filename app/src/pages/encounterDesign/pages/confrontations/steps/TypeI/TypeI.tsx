import Drawers from "../../../../../../components/drawers/Drawers";
import Step0 from "./steps/Step0";
import Step1 from "./steps/Step1";
import MappedDrawers from "../../../../utilities/MappedDrawers";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

export default function TypeI() {
    const steps = [
        {
            label: "(Optional) Step 0: Determine Desired Action",
            child: <Step0 />
        },
        {
            label: "Step 1: Determine Emotion(s)",
            child: <Step1 />
        },
        {
            label: "Step 2: Determine Skull & Ranks",
            child: <Step2 />
        },
        {
            label: "(Optional) Step 3: Determine Repeating Pace",
            child: <Step3 />
        }
    ]

    return <MappedDrawers steps={steps} />
}

